import styled from "styled-components";
import { Col, Image } from "react-bootstrap";

export const StyledDiv = styled.div`
    background-color: #E4E4E7;
    height: 100%;
`;
export const ImageCol = styled(Col)`
    display: flex;
    justify-content: end;
    align-items: center;

    @media (max-width: 850px) {
        display: none;
    }
    z-index: 4;
`;

export const FormCol = styled(Col)`
    display: flex;
    justify-content: start;
    align-items: center;

    @media (max-width: 850px) {
        justify-content: center;
    }
    z-index: 2;
`;

export const FormDiv = styled.div`
    background-color: white;
    width: 400px;
    height: 525px;
    border-radius: 10px;
`;

export const StyledImg = styled(Image)`
    width: 400px;
    height: 550px;
    box-shadow:  0 4px 4px 2px rgb(200, 200, 200);
    border-radius: 10px;
`;

export const Title = styled.h2`
    color: #3F3F3F;
    font-family: Alice
`

export const Styledspan = styled.span`
    color: #0275d8;
    font-weight: 800;
`

export const StyledDiv2 = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const VTitle = styled.h2`
    color: #0275d8;
    font-weight: 800;
`

export const VerificationDiv = styled.div`
    background-color: rgb(250, 250, 250);
    width: 450px;
    height: 400px;
    border-radius: 10px;
    box-shadow:  0 4px 4px 2px gray;

    @media (max-width: 500px){
        width: 400px;
    }
`

export const ErrorMsg = styled.p`
    color: red;
`