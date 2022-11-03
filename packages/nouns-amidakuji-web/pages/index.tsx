import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'react-bootstrap/Image';
import { Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';
import useCurrentAmidakuji from '../src/hooks/useCurrentAmidakuji';
import dayjs from 'dayjs';
import NavBar from '../src/components/NavBar';
import { useCallback, useState } from 'react';

const Home: NextPage = () => {
  const { game, entry, draw } = useCurrentAmidakuji();
  const [pos, setPos] = useState<number>();
  const [name, setName] = useState<string>('');
  const [x, setX] = useState<number>();
  const [y, setY] = useState<number>();

  const onEntry = useCallback(() => {
    if (entry && pos && name) {
      entry(name, pos);
    }
  }, [entry, name, pos]);

  const onDraw = useCallback(() => {
    if (draw && x && y) {
      draw(x, y);
    }
  }, [draw, x, y]);

  return (
    <div>
      <Head>
        <title>Nouns Amidakuji</title>
        <meta name="description" content="Nouns Amidakuji" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Wrapper>
        <Container fluid="xl">
          <NavBar />
          <Row>
            <NounContentCol lg={{ span: 6 }}>
              <NounWrapper>
                <ImageWrapper>
                  <NounImage src={'/sample.png'} alt={''} fluid />
                </ImageWrapper>
              </NounWrapper>
            </NounContentCol>
            <AuctionActivityCol lg={{ span: 6 }}>
              <AuctionActivityWrapper>
                <InformationRow>
                  <ActivityRow>
                    <AuctionTitleAndNavWrapper lg={12}>
                      <NavArrowsContainer>
                        <button>←</button>
                        <button>→</button>
                      </NavArrowsContainer>
                      <AuctionActivityDateHeadlineWrapper>
                        <AuctionActivityDateHeadlineDate>
                          {game &&
                            dayjs
                              .unix(game.startTime.toNumber())
                              .format('YYYY-MM-DD HH:mm:ss')}
                        </AuctionActivityDateHeadlineDate>
                      </AuctionActivityDateHeadlineWrapper>
                    </AuctionTitleAndNavWrapper>
                    <Col lg={12}>
                      <AuctionActivityNounTitle>
                        <h1 style={{ color: 'var(--brand-cool-dark-text)' }}>
                          # {game?.id.toNumber()}
                        </h1>
                      </AuctionActivityNounTitle>
                    </Col>
                  </ActivityRow>
                  <ActivityRow>
                    <div>
                      <input
                        type="text"
                        placeholder="NAME(max length 3)"
                        onChange={(e) => setName(e.target.value)}
                      />
                      <input
                        type="number"
                        placeholder="POS(1~6)"
                        min={1}
                        max={6}
                        onChange={(e) => setPos(parseInt(e.target.value))}
                        style={{ width: 120 }}
                      />
                      <button onClick={onEntry}>Entry</button>
                    </div>
                  </ActivityRow>
                  <ActivityRow>
                    <div>
                      <input
                        type="number"
                        placeholder="X(1~5)"
                        min={1}
                        max={5}
                        onChange={(e) => setX(parseInt(e.target.value))}
                        style={{ width: 80 }}
                      />
                      <input
                        type="number"
                        placeholder="Y(1~12)"
                        min={1}
                        max={12}
                        onChange={(e) => setY(parseInt(e.target.value))}
                        style={{ width: 80 }}
                      />
                      <button onClick={onDraw}>Draw</button>
                    </div>
                  </ActivityRow>
                  <ActivityRow>
                    players:
                    {game?.players.map((p) => (
                      <div key={p}>{p}</div>
                    ))}
                  </ActivityRow>
                  <ActivityRow>
                    playerNames:
                    {game?.playerNames.map((p) => (
                      <div key={p}>{p}</div>
                    ))}
                  </ActivityRow>
                  <ActivityRow>
                    playerPositions: {game?.playerPositions?.join(',')}
                  </ActivityRow>
                </InformationRow>
              </AuctionActivityWrapper>
            </AuctionActivityCol>
          </Row>
        </Container>
      </Wrapper>
    </div>
  );
};

export default Home;

const Wrapper = styled.div`
  background-color: rgb(213, 215, 225);
`;
const NounWrapper = styled.div`
  align-self: flex-end;
  width: 100%;
`;

const NounContentCol = styled(Col)`
  display: flex;
`;

const ImageWrapper = styled.div`
  position: relative;
  padding-top: 100%;
  width: 100%;
  height: 0;
`;

const NounImage = styled(Image)`
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  vertical-align: middle;
`;

const AuctionActivityCol = styled(Col)`
  padding-right: 5rem;
  padding-bottom: 0rem;
  min-height: 520px;
`;

const AuctionActivityWrapper = styled.div`
  @media (max-width: 992px) {
    margin-left: 1rem;
    margin-right: 1rem;
  }
`;

const InformationRow = styled.div`
  margin-bottom: 0.5rem;
`;

const AuctionTitleAndNavWrapper = styled(Col)`
  display: flex;

  @media (max-width: 992px) {
    font-size: 2.75rem;
  }
`;

const ActivityRow = styled(Row)`
  margin-bottom: 0rem;
`;

const NavArrowsContainer = styled.div`
  position: absolute;
`;

const AuctionActivityDateHeadlineWrapper = styled.div`
  margin-left: 5rem;
  width: auto;
`;

const AuctionActivityDateHeadlineDate = styled.h4`
  font-family: 'PT Root UI';
  font-weight: bold;
  font-size: 17px;
  line-height: 27px;
  margin-top: 0.22rem;
  color: var(--brand-cool-light-text);
`;

const AuctionActivityNounTitle = styled.div`
  display: inline-block;

  h1 {
    font-family: 'Londrina Solid';
    font-size: 68px;
    margin-bottom: 10px;
  }

  @media (max-width: 992px) {
    h1 {
      font-size: 56px;
    }
  }
`;
