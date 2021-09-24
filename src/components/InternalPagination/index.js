import React, {Component} from 'react';
import {View, Modal, ScrollView, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {change} from 'redux-form';
import t from 'locales/use-translation';
import {IProps, IStates} from './type';
import {colors, headerTitle} from '@/styles';
import styles from './styles';
import {SlideModal} from '../SlideModal';
import {FakeInput} from '../FakeInput';
import {hasTextLength, hasValue, isAndroidPlatform, isEmpty} from '@/constants';
import {internalSearch} from '@/utils';
import {ARROW_ICON} from '@/assets';
import {commonSelector} from 'stores/common/selectors';
import {MainLayout} from '../Layouts';
import Empty from '../Empty';
import {ListView} from '../ListView';
import {Content} from '../Content';

const ITEMS_PER_PAGE = 15;

const isScrollToEnd = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 65;

  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};
export class InternalPaginationComponent extends Component<IProps, IStates> {
  constructor(props) {
    super(props);
    this.state = this.initialState();
  }

  initialState = () => {
    return {
      search: '',
      visible: false,
      searchItems: [],
      itemList: [],
      currentPage: 0,
      loading: this.props?.hideLoader ? false : true,
      searchLoading: false,
      bottomLoader: false
    };
  };

  setInitialState = async () => {
    const {
      input: {value},
      compareField,
      items,
      displayName
    } = this.props;
    if (!value) {
      return;
    }

    let newValue = '';
    for (const key in items) {
      if (hasValue(key) && items[key]['fullItem'][compareField] === value) {
        newValue = items[key]['fullItem'][displayName];
        break;
      }
    }
    await this.setState({
      values: compareField ? newValue : value[displayName],
      searchItems: items || []
    });
  };

  onToggle = () => {
    const {meta, input, items} = this.props;
    const {visible} = this.state;
    if (visible) {
      this.setState(this.initialState());
      meta.dispatch(change(meta.form, `search-${input?.name}`, ''));
    } else {
      this.setInitialState();
      this.setState({visible: true});
      this.getItems();
    }
  };

  onItemSelect = item => {
    const {onSelect} = this.props;
    onSelect(item);
    if (!hasValue(item)) {
      this.setState({values: null});
      return;
    }

    const {displayName} = this.props;
    this.setState({values: item[displayName]});
    this.onToggle();
  };

  onSearch = async search => {
    this.setState({searchLoading: true, search});
    const {items, searchFields} = this.props;
    const newData = internalSearch({
      items,
      search,
      searchFields
    });

    await this.setState({searchItems: newData, currentPage: 0, itemList: []});
    this.getItems();
  };

  getEmptyTitle = () => {
    const {emptyContentProps} = this.props;
    const {search} = this.state;
    const emptyContentType = emptyContentProps?.contentType;
    let emptyTitle = '';

    if (emptyContentType) {
      emptyTitle = t(`${emptyContentType}.empty.title`);
    }

    let noSearchResult = t('search.noSearchResult');

    return {
      title: hasTextLength(search)
        ? `${noSearchResult} "${search}"`
        : emptyTitle,
      description: t(`${emptyContentType}.empty.description`)
    };
  };

  getItems = async () => {
    const {
      search,
      currentPage,
      searchItems,
      itemList,
      searchLoading,
      loading,
      bottomLoader
    } = this.state;
    const {items} = this.props;
    await this.setState({bottomLoader: true});
    const currentItemsList = hasTextLength(search) ? searchItems : items;
    const itemsList = currentItemsList.slice(
      currentPage * ITEMS_PER_PAGE,
      (currentPage + 1) * ITEMS_PER_PAGE
    );

    this.setState({
      itemList: [...itemList, ...itemsList],
      currentPage: currentPage + 1
    });
    if (searchLoading) {
      this.setState({searchLoading: false});
    }
    if (loading) {
      this.setState({loading: false});
    }
    if (bottomLoader) {
      this.setState({bottomLoader: false});
    }
  };

  render() {
    const {
      containerStyle,
      theme,
      items,
      label,
      icon,
      placeholder,
      meta,
      headerProps,
      fakeInputProps,
      listViewProps,
      emptyContentProps,
      searchInputProps,
      input,
      input: {value},
      isRequired,
      customView,
      scrollViewStyle,
      contentContainerStyle
    } = this.props;

    const {
      visible,
      values,
      itemList,
      currentPage,
      loading,
      searchLoading,
      bottomLoader,
      searchItems,
      search
    } = this.state;
    const lastPage = Math.ceil(
      hasTextLength(search)
        ? searchItems.length / ITEMS_PER_PAGE
        : items.length / ITEMS_PER_PAGE
    );
    const isMoreItems = currentPage <= lastPage;
    const loaderColor =
      theme?.mode === 'light' ? colors.veryDarkGray : colors.white;

    const loadingProps = {
      is: loading || searchLoading,
      ...(searchLoading && {
        style: styles.searchLoader
      })
    };

    let layoutHeaderProps = {
      leftIcon: ARROW_ICON,
      leftIconPress: () => this.onToggle(),
      withTitleStyle: headerTitle({}),
      placement: 'center',
      rightIcon: 'plus',
      hasCircle: false,
      noBorder: false,
      transparent: false,
      ...headerProps
    };

    const loader = (
      <ActivityIndicator
        size={'large'}
        color={loaderColor}
        style={styles.loader}
      />
    );

    let fieldView = !customView ? (
      <FakeInput
        label={label}
        icon={icon}
        isRequired={isRequired}
        values={value && (values || placeholder)}
        placeholder={placeholder}
        onChangeCallback={this.onToggle}
        containerStyle={containerStyle}
        meta={meta}
        rightIcon={'angle-down'}
        {...fakeInputProps}
      />
    ) : (
      customView
    );
    return (
      <View style={styles.container}>
        {fieldView}
        <Modal
          animationType="slide"
          visible={visible}
          onRequestClose={this.onToggle}
          hardwareAccelerated={true}
          statusBarTranslucent={true}
        >
          <View style={styles.modalContainer}>
            <MainLayout
              headerProps={{
                ...layoutHeaderProps,
                ...(isAndroidPlatform && {
                  containerStyle: styles.header
                })
              }}
              onSearch={this.onSearch}
              inputProps={searchInputProps && searchInputProps}
              searchFieldProps={{
                name: `search-${input?.name}`,
                ...(theme?.mode === 'dark' && {
                  inputContainerStyle: {
                    height: 38
                  },
                  inputFieldStyle: {
                    marginTop: 10,
                    marginBottom: 14
                  }
                })
              }}
              searchFieldStyle={styles.searchView}
            >
              <ScrollView
                style={[styles.scrollViewContainer, scrollViewStyle]}
                contentContainerStyle={[{flexGrow: 1}, contentContainerStyle]}
                scrollEventThrottle={400}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="on-drag"
                onScroll={({nativeEvent}) => {
                  if (isScrollToEnd(nativeEvent) && isMoreItems) {
                    this.getItems();
                  }
                }}
              >
                <Content loadingProps={loadingProps} theme={theme}>
                  <ListView
                    items={itemList}
                    onPress={this.onItemSelect}
                    isEmpty={isEmpty(itemList)}
                    bottomDivider={true}
                    emptyContentProps={{
                      ...this.getEmptyTitle(),
                      ...emptyContentProps
                    }}
                    itemContainer={{paddingVertical: 16}}
                    {...listViewProps}
                  />
                  {!loading && bottomLoader && isMoreItems && loader}
                </Content>
              </ScrollView>
            </MainLayout>
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  ...commonSelector(state)
});

export const InternalPagination = connect(mapStateToProps)(
  InternalPaginationComponent
);
