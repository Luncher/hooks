/**
 * title: Cache & SWR
 * desc: If options.cacheKey is set, useRequest will cache the data of last request. On next component load, if there is cached data, we will return the cached data first, and then send a new request in background, like SWR.
 *
 * title.zh-CN: 缓存 & SWR
 * desc.zh-CN: 如果设置了 `cacheKey` ， useRequest 会将当前请求结束数据缓存起来。下次组件初始化时，如果有缓存数据，我们会优先返回缓存数据，然后在背后发送新请求，也就是 SWR 的能力。
 */

import { useBoolean, useRequest } from '@umijs/hooks';
import { Button, Spin } from 'antd';
import React from 'react';
import { getArticle } from './service';

export default () => {
  const { state, toggle } = useBoolean();
  return (
    <div>
      <p>You can click the button multiple times, the article component will show the cached data first.</p>
      <p>
        <Button onClick={() => toggle()}>show/hidden</Button>
      </p>
      {state && <Article />}
    </div>
  )
};

const Article = () => {
  const { data, loading } = useRequest(getArticle, {
    cacheKey: 'article'
  });
  return (
    <Spin spinning={!data && loading}>
      <p>Latest request time: {data?.time}</p>
      <p>{data?.data}</p>
    </Spin>
  );
}