import React, { useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';

import { useGetCryptosQuery } from '../services/cryptoApi';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
 import Loader from './Loader';

const demoImage = 'https://a57.foxnews.com/static.foxnews.com/foxnews.com/content/uploads/2024/08/1200/675/White-House-Plastic-Cutlery.jpg?ve=1&tl=1';

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const { data: cryptoData } = useGetCryptosQuery(100);
  const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 10 : 12 });

  console.log(cryptoData);
  console.log(cryptoNews);


  if (!cryptoNews) return <Loader/>; // Adjusted condition

  const getCryptoImage = (newsCategory) => {
    const crypto = cryptoData?.data?.coins?.find(coin => coin.name === newsCategory);
    return crypto ? crypto.iconUrl : demoImage;
  };

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
            {cryptoData?.data?.coins?.map((currency) => <Option key={currency.name} value={currency.name}>{currency.name}</Option>)}
          </Select>
        </Col>
      )}
      {cryptoNews.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.link} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>{`${i + 1}. ${news.title}`}</Title>
                <img style={{ maxWidth: '200px', maxHeight: '100px' }} src={news.image || demoImage} alt="" />
              </div>
              <p>{news.preview.length > 100 ? `${news.preview.substring(0, 100)}...` : news.preview}</p>
              <div className="provider-container">
                <div>
                  <Avatar src={getCryptoImage(newsCategory)} alt="" />
                  <Text className="provider-name">{news.publisher}</Text>
                </div>
                <Text>{moment(news.date * 1000).startOf('ss').fromNow()}</Text> {/* Adjusted date format */}
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
