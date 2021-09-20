import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {Field, change} from 'redux-form';
import {omit} from 'lodash';
import styles from './customize-payment-style';
import {
  DefaultLayout,
  ToggleSwitch,
  CtDivider,
  Tabs,
  Editor,
  PLACEHOLDER_TYPES as TYPE,
  Text,
  ActionButton
} from '@/components';
import {
  CUSTOMIZE_PAYMENT_FORM,
  PAYMENT_SETTINGS_TYPE,
  PAYMENT_SWITCH_FIELDS,
  PAYMENT_TABS
} from 'stores/customize/types';
import t from 'locales/use-translation';
import {IProps, IStates} from './customize-payment-type';
import {routes} from '@/navigation';
import {hasObjectLength, hasTextLength, hasValue} from '@/constants';
import {PaymentModes} from 'screens/payment-modes';
import {NumberScheme} from '../customize-common';
import {
  fetchCustomizeSettings,
  updateCustomizeSettings
} from 'stores/customize/actions';

export default class CustomizePayment extends Component<IProps, IStates> {
  constructor(props) {
    super(props);
    this.paymentChild = React.createRef();
    this.state = {
      activeTab: PAYMENT_TABS.MODE
    };
  }

  componentDidMount() {
<<<<<<< HEAD
    const {dispatch, navigation} = this.props;

    dispatch(fetchCustomizeSettings(PAYMENT_SETTINGS_TYPE));
    goBack(MOUNT, navigation);
  }

  componentWillUnmount() {
    goBack(UNMOUNT);
=======
    const {dispatch, customizes} = this.props;

    let hasCustomizeApiCalled = customizes
      ? typeof customizes === 'undefined' || customizes === null
      : true;

    hasCustomizeApiCalled && dispatch(fetchCustomizeSettings());
  }

  componentWillUnmount() {
    this.state.isUpdateAutoGenerate &&
      this.props.dispatch(setCustomizeSettings({customizes: null}));
>>>>>>> 5e5ec76aba14b010b1a4b534387ac8cd07add5cc
  }

  setFormField = (field, value) => {
    this.props.dispatch(change(CUSTOMIZE_PAYMENT_FORM, field, value));
  };

  setActiveTab = activeTab => {
    this.setState({activeTab});
  };

  getTextAreaPlaceholderTypes = () => {
    const company = [TYPE.PREDEFINE_COMPANY, TYPE.PAYMENT];
    const email = [TYPE.PREDEFINE_CUSTOMER, TYPE.CUSTOMER, TYPE.PAYMENT];
    const customer = [
      TYPE.PREDEFINE_BILLING,
      TYPE.PREDEFINE_CUSTOMER,
      TYPE.CUSTOMER,
      TYPE.PAYMENT
    ];
    return {
      email,
      company,
      customer
    };
  };

  onSave = values => {
    let params = values;
    for (const key in params) {
      if (key.includes('mail_body') || key.includes('address_format')) {
        if (!hasValue(params[key]) || !hasTextLength(params[key])) {
          params[key] = `<p></p>`;
        }
      }
    }
    PAYMENT_SWITCH_FIELDS.forEach(
      field => (params[field] = params[field] === true ? 'YES' : 'NO')
    );
    params = omit(params, ['next_umber']);
    const {dispatch, navigation} = this.props;
    dispatch(updateCustomizeSettings({params, navigation}));
  };

  TOGGLE_FIELD_VIEW = () => {
    const {theme} = this.props;
    return (
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <CtDivider dividerStyle={styles.dividerLine} />

        <Text
          color={theme.header.primary.color}
          style={styles.autoGenerateHeader}
        >
          {t('customizes.setting.payment')}
        </Text>
        <Field
          name={'payment_auto_generate'}
          component={ToggleSwitch}
          hint={t('customizes.autoGenerate.payment')}
          description={t('customizes.autoGenerate.paymentDescription')}
        />
        <Field
          name={'payment_email_attachment'}
          component={ToggleSwitch}
          hint={t('customizes.emailAttachment.payment')}
          description={t('customizes.emailAttachment.paymentDescription')}
        />
      </ScrollView>
    );
  };

  TEXTAREA_FIELDS = () => {
    const {email, company, customer} = this.getTextAreaPlaceholderTypes();

    return (
      <>
        <Editor
          {...this.props}
          types={email}
          name={'payment_mail_body'}
          label={'customizes.addresses.sendPaymentEmailBody'}
          showPreview
        />

        <Editor
          {...this.props}
          types={company}
          name={'payment_company_address_format'}
          label={'customizes.addresses.company'}
          showPreview
        />

        <Editor
          {...this.props}
          types={customer}
          name={'payment_from_customer_address_format'}
          label={'customizes.addresses.customerAddress'}
          showPreview
        />
      </>
    );
  };

  PAYMENT_CUSTOMIZE = () => {
    const {
      formValues: {
        payment_number_scheme,
        payment_prefix,
        payment_number_separator,
        payment_number_length
      }
    } = this.props;
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContainer}
      >
        <NumberScheme
          {...this.props}
          keyName={`payment`}
          numberSchemeField={{
            name: 'payment_number_scheme',
            value: payment_number_scheme
          }}
          prefixField={{
            name: 'payment_prefix',
            value: payment_prefix
          }}
          separatorField={{
            name: 'payment_number_separator',
            value: payment_number_separator
          }}
          numberLengthField={{
            name: 'payment_number_length',
            value: payment_number_length
          }}
        />
        {this.TEXTAREA_FIELDS()}
        {this.TOGGLE_FIELD_VIEW()}
      </ScrollView>
    );
  };

  render() {
    const {formValues, navigation, isLoading, theme, handleSubmit} = this.props;
    const {activeTab} = this.state;
    let isPaymentMode = activeTab === PAYMENT_TABS.MODE;
    let loading = isLoading || !hasObjectLength(formValues);
    let label = isPaymentMode ? 'button.add' : 'button.save';

    const bottomAction = [
      {
        label,
        onPress: () =>
          isPaymentMode
            ? this.paymentChild?.openModal?.()
            : handleSubmit(this.onSave)(),
        loading: this.props.loading
      }
    ];

    return (
      <DefaultLayout
        headerProps={{
          leftIconPress: () => navigation.navigate(routes.CUSTOMIZE_LIST),
          title: t('header.payments'),
          rightIconPress: null,
          placement: 'center',
          leftArrow: 'primary'
        }}
        bottomAction={<ActionButton buttons={bottomAction} />}
        loadingProps={{is: loading}}
        hideScrollView
        toastProps={{
          reference: ref => (this.toastReference = ref)
        }}
      >
        <Tabs
          activeTab={activeTab}
          style={styles.tabs(theme)}
          tabStyle={styles.tabView}
          setActiveTab={this.setActiveTab}
          theme={theme}
          tabs={[
            {
              Title: PAYMENT_TABS.MODE,
              tabName: t('payments.modes'),
              render: (
                <PaymentModes
                  reference={ref => (this.paymentChild = ref)}
                  setFormField={(field, value) =>
                    this.setFormField(field, value)
                  }
                />
              )
            },
            {
              Title: PAYMENT_TABS.PREFIX,
              tabName: t('payments.prefix'),
              render: this.PAYMENT_CUSTOMIZE()
            }
          ]}
        />
      </DefaultLayout>
    );
  }
}
