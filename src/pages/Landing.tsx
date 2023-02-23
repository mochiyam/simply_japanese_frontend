import styled from "styled-components";
import TextareaAutosize from 'react-textarea-autosize';
import './Landing.css';
import { TiArrowRightThick } from "react-icons/ti"
import { Discuss } from 'react-loader-spinner'
import { useState, useEffect } from "react";
import axios from "axios";


export default function Landing() {
  const Page = styled.div`
    height: 100vh;
    width: auto;
    background-color: white;
  `

  const Header = styled.div`
    display: flex;
  `

  const HeaderLogo = styled.img`
    height: 8%;
    position: absolute;
    top: 4%;
    left: 4%;
  `

  const Section = styled.div`
    display: flex;
  `

  const LandingImage = styled.img`
    height: 60%;
    position: absolute;
    top: 20%;
    right: 5%;
  `

  const LandingTitle = styled.h1`
    font-size: 2rem;
    font-family: gill-sans, sans-serif;
    width: 50%;
  `

  const InputSection = styled.div`
    position: absolute;
    top: 30%;
    left: 10%;
    padding: 10px;
    width: 50%;
  `

  const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 65%;
  `

  const TextAreaContainer = styled.div`
    display: flex;
    align-items: center;
  `

  const ConvertButton = styled.button`
    border-radius: 50%;
    background-color: #feb350;
    color: white;
    font-size: 1.25rem;
    border: 1px solid #ebebeb;
    display: block;
    padding: 10px;
    cursor: pointer;
    height: 80px;
    width: 80px;
    position: relative;
    right: 40px;
    box-shadow: 0 1px #999;

    &:hover {
      background-color: #fea837;
    }

    &:active {
      background-color: #fe9d1d;
      transform: translateY(1px);
    }
  `

  const BackButton = styled.button`
    background-color: transparent;
    border: none;
    font-size: 1rem;
    margin-top: 1rem;
    cursor: pointer;
    color: #0000EE;

    &:hover {
     text-decoration: underline;
    }
  `

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [result, setResult] = useState<string>("")

  useEffect(() => {
    if (result) setIsLoading(false)
  }, [result])

  const makeApiCall = async () => {
    // @ts-ignore:
    let inputValue = document.getElementById("input_text_area").value

    // add your API endpoint here
    const request = await axios.get("https://www.boredapi.com/api/activity", { params: { inputText: inputValue }})
    return request.data
  }

  const convertText = () => {
    setIsLoading(true)
    makeApiCall().then((response) => setResult(response.activity))
  }

  const backToInput = () => {
    setResult("")
  }

  return (
    <Page>
      <Header>
        <HeaderLogo src="/images/simplyjapanese-logo.png" />
      </Header>
      <Section>
        <LandingImage src="/images/simplyjapanese-landing.png" />
        <InputSection>
          <LandingTitle>
            Convert your Japanese text below!
          </LandingTitle>
          {isLoading &&
            <LoadingContainer>
              <Discuss
                height="100"
                width="100"
                ariaLabel="translation-loading"
                colors={["#feb350", "#fe9d1d"]}
              />
            </LoadingContainer>
          }
          {!isLoading && !result &&
            <TextAreaContainer>
              <TextareaAutosize
                id="input_text_area"
                className="input-text-area"
                minRows={3}
                maxRows={15}
                placeholder="Enter your text here..."
              />
              <ConvertButton onClick={convertText}>
                <TiArrowRightThick size={40} />
              </ConvertButton>
            </TextAreaContainer>
          }
          {!isLoading && result &&
            <>
              <TextAreaContainer>
                <TextareaAutosize
                  id="result_text_area"
                  className="input-text-area"
                  minRows={3}
                  maxRows={15}
                  value={result}
                />
              </TextAreaContainer>
              <BackButton onClick={backToInput}>
                Simplify another text
              </BackButton>
            </>
          }
        </InputSection>
      </Section>
    </Page>
  )
}