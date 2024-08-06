import Loader from "../components/Loader";

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const { data: cryptos } = useGetCryptosQuery(100);
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 12 });

  if (isFetching) return <Loader/>;
  if (!cryptoNews?.coins) return 'No news available'; // Adjusted for the actual data structure
;;;
  console.log(cryptoNews);

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {cryptos?.data?.coins?.map((currency) => (
              <Option key={currency.uuid} value={currency.name}>{currency.name}</Option>
            ))}
          </Select>
        </Col>
      )}
      {cryptoNews.coins.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.link} target="_blank" rel="noopener noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>{news.title}</Title>
                <img
                  style={{ maxWidth: '200px', maxHeight: '100px' }}
                  src={news.image}
                  alt={news.title}
                />
              </div>
              <p>{news.preview.length > 100 ? `${news.preview.substring(0, 100)}...` : news.preview}</p>
              <div className="provider-container">
                <div>
                  <img
                    src={news.pubLogo}
                    alt={news.publisher}
                    className="publisher-logo"
                  />
                  <Text className="provider-name">{news.publisher}</Text>
                </div>
                <Text>{moment.unix(news.date).fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;































// import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// const cryptoApiHeaders={
    
//     'x-rapidapi-key': 'abf4d97c1bmsh2049e01ea0b8043p1fa9c9jsn778e46906030',
//     'x-rapidapi-host': 'coinranking1.p.rapidapi.com'
// };
// // const baseUrl='https://coinranking1.p.rapidapi.com';

// const createRequest = (url) => ({ url, headers: cryptoApiHeaders });


// export const cryptoApi =createApi({
//   reducerPath: 'cryptoApi',
//   baseQuery: fetchBaseQuery({ baseUrl:'https://coinranking1.p.rapidapi.com'}),
//   endpoints: (builder) => ({
//     getCryptos: builder.query({
//       query: (count) => createRequest('/coins'),
//     }),

//     // getCryptoDetails: builder.query({
//     //   query: (coinId) => createRequest(`/coin/${coinId}`),
//     // }),

//     // // Note: Change the coin price history endpoint from this - `coin/${coinId}/history/${timeperiod} to this - `coin/${coinId}/history?timeperiod=${timeperiod}`
//     // getCryptoHistory: builder.query({
//     //   query: ({ coinId, timeperiod }) => createRequest(`coin/${coinId}/history?timeperiod=${timeperiod}`),
//     // }),

//     // // Note: To access this endpoint you need premium plan
//     // getExchanges: builder.query({
//     //   query: () => createRequest('/exchanges'),
//     // }),
//   }),
// })
// export const{
//     useGetCryptosQuery,
// }=cryptoApi;