import React from 'react';
import { Text as RNText } from 'react-native';
import styled, { css } from 'styled-components/native';
import { ifProp, prop } from 'styled-tools';
import { applyProp, fontSizes, hasProp } from '../../utils';
import { fonts, colors } from '../../styles';

const CTText = ({ children, ...props }) => (
    <RNText {...props}>{children}</RNText>
);

export const Text = styled(CTText)`

    color: ${colors.secondary};
    text-align: left;
    font-family: ${fonts.poppins};

    ${ifProp('h6', fontSizes.h6)}

    ${ifProp('h5', fontSizes.h5)}

    ${ifProp('h4', fontSizes.h4)}

    ${ifProp('mediumSize', fontSizes.mediumSize)}

    ${ifProp('h3', fontSizes.h3)}

    ${ifProp('bigMediumSize', fontSizes.bigMediumSize)}

    ${ifProp('h2', fontSizes.h2)}

    ${ifProp('h1', fontSizes.h1)}

    ${ifProp('biggestSize', fontSizes.biggestSize)}

    ${ifProp(
        'danger',
        css`
            color: ${colors.danger};
        `
    )}

    ${ifProp(
        'primary',
        css`
            color: ${colors.primary};
        `
    )};

    ${ifProp(
        'primaryLight',
        css`
            color: ${colors.primaryLight};
        `
    )};

    ${ifProp(
        'secondary',
        css`
            color: ${colors.secondary};
        `
    )};

    ${ifProp(
        'white',
        css`
            color: ${colors.white};
        `
    )}

    ${ifProp(
        'black',
        css`
            color: ${colors.black};
        `
    )};

    ${ifProp(
        'veryLightGray',
        css`
            color: ${colors.veryLightGray};
        `
    )};

    ${ifProp(
        'gray',
        css`
            color: ${colors.gray};
        `
    )};

    ${ifProp(
        'darkGray',
        css`
            color: ${colors.darkGray};
        `
    )};

    ${ifProp(
        'darkGray2',
        css`
            color: ${colors.darkGray2};
        `
    )};

    ${ifProp(
        'veryDarkGray',
        css`
            color: ${colors.veryDarkGray};
        `
    )};

    ${ifProp(
        'dark',
        css`
            color: ${colors.dark};
        `
    )};

    ${ifProp(
        'dark2',
        css`
            color: ${colors.dark2};
        `
    )};

    ${ifProp(
        'dark3',
        css`
            color: ${colors.dark3};
        `
    )};

    ${ifProp(
        'flex',
        css`
            flex: ${prop('flex')};
        `
    )}

    ${props =>
        props?.theme?.mode === 'light' &&
        props?.lightColor &&
        css`
            color: ${props.lightColor};
        `};

    ${props =>
        props?.theme?.mode === 'dark' &&
        props?.darkColor &&
        css`
            color: ${props.darkColor};
        `};
        
    ${ifProp(
        'color',
        css`
            color: ${props => props.color};
        `
    )}
    
    ${ifProp(
        'wide',
        css`
            width: 100%;
        `
    )};

    ${ifProp(
        'left',
        css`
            text-align: left;
        `
    )};

    ${ifProp(
        'center',
        css`
            text-align: center;
        `
    )};

    ${ifProp(
        'right',
        css`
            text-align: right;
        `
    )};

    ${ifProp(
        'italic',
        css`
            font-style: italic;
        `
    )};

    ${ifProp(
        'bold',
        css`
            font-family: ${fonts.poppinsBold};
        `
    )};

    ${ifProp(
        'normal',
        css`
            font-family: ${fonts.poppins};
        `
    )};

    ${ifProp(
        'light',
        css`
            font-family: ${fonts.poppinsLight};
        `
    )};

    ${ifProp(
        'bold2',
        css`
            font-family: ${fonts.poppinsSemiBold};
        `
    )};

    ${ifProp(
        'medium',
        css`
            font-family: ${fonts.poppinsMedium};
        `
    )};

    ${ifProp(
        'font-weight-600',
        css`
            font-weight: 600;
        `
    )};

    ${ifProp(
        'upperCase',
        css`
            text-transform: uppercase;
        `
    )}

    ${ifProp(
        'lowercase',
        css`
            text-transform: lowercase;
        `
    )}

    ${ifProp(
        'capitalize',
        css`
            text-transform: capitalize;
        `
    )}

    ${ifProp(
        'positionAbsolute',
        css`
            position: absolute;
        `
    )}

    ${/* Margin */ ''}
    ${props =>
        hasProp(props, 'mx-') &&
        css`
            margin-horizontal: ${applyProp(props, 'mx-')};
        `};
  
    ${props =>
        hasProp(props, 'my-') &&
        css`
            margin-vertical: ${applyProp(props, 'my-')};
        `};
  
    ${props =>
        hasProp(props, 'mt-') &&
        css`
            margin-top: ${applyProp(props, 'mt-')};
        `};
  
    ${props =>
        hasProp(props, 'mb-') &&
        css`
            margin-bottom: ${applyProp(props, 'mb-')};
        `};
  
    ${props =>
        hasProp(props, 'ml-') &&
        css`
            margin-left: ${applyProp(props, 'ml-')};
        `};
  
    ${props =>
        hasProp(props, 'mr-') &&
        css`
            margin-right: ${applyProp(props, 'mr-')};
        `};
  
    ${/* Padding */ ''}
    ${props =>
        hasProp(props, 'px-') &&
        css`
            padding-horizontal: ${applyProp(props, 'px-')};
        `};
  
    ${props =>
        hasProp(props, 'py-') &&
        css`
            padding-vertical: ${applyProp(props, 'py-')};
        `};
  
    ${props =>
        hasProp(props, 'pt-') &&
        css`
            padding-top: ${applyProp(props, 'pt-')};
        `};
  
    ${props =>
        hasProp(props, 'pb-') &&
        css`
            padding-bottom: ${applyProp(props, 'pb-')};
        `};
  
    ${props =>
        hasProp(props, 'pl-') &&
        css`
            padding-left: ${applyProp(props, 'pl-')};
        `};
  
    ${props =>
        hasProp(props, 'pr-') &&
        css`
            padding-right: ${applyProp(props, 'pr-')};
        `};

    ${prop('style')}

`;
