import styled from 'styled-components';

export const CustomContainer = styled.div`
    background-color: ${({ theme }) => theme.colors.white};
    max-width: 380px;
    max-height: 433px;
    padding-top: 49px;
    padding-left: 30px;
    padding-right: 30px;
    border-radius: 28px;
    flex-direction: column;
    display: flex;
`;

export const CustomTitle = styled.text`
    color: ${({ theme }) => theme.colors.blue600};
    text-align: left;
    font-family: 'Epilogue';
    font-size: 36px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -2.34px;
`;

export const Customdot = styled.text`
    color: ${({ theme }) => theme.colors.orange500};
    font-family: 'Epilogue';
    font-size: 36px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -2.34px;
`;

export const CustomSubTitle = styled.text`
    color: ${({ theme }) => theme.colors.gray500};
    font-family: 'Epilogue';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 127%;
    letter-spacing: -1.04px;
    padding-top: 16px;
`;

export const CustomButtonPrimary = styled.button`
    background-color: ${({ theme }) => theme.colors.blue600};
    color: ${({ theme }) => theme.colors.white};
    display: flex;
    width: 100%;
    height: 57px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    cursor: pointer;
`;

export const CustomButtonSecondary = styled.button`
    color: ${({ theme }) => theme.colors.white};
    display: flex;
    padding: 12px 20px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.colors.blue800};
    background: ${({ theme }) => theme.colors.blue800};
    box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
`;

export const CustomTextButton = styled.text`
    color: ${({ theme }) => theme.colors.ray150};
    margin-right: 8px;
    text-transform: none;
    text-align: right;
    font-family: 'Epilogue';
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -1.56px;
`;

export const CustomForgotPassword = styled.div`
    text-align: right;
    padding-top: 23px;
`;

export const CustomTextForgotPassword = styled.div`
    color: ${({ theme }) => theme.colors.orange700};
    text-align: right;
    font-family: 'Epilogue';
    font-size: 11px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.715px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    text-transform: none;
`;

export const CustomImgIcon = styled.img`
    max-width: 100%;
    padding-right: 4px;
`;

export const CustomErrorMessage = styled.div`
    color: ${({ theme }) => theme.colors.orange700};
    text-align: center;
`;