import { useEffect, useState } from "react";
const api = require("@home/api");
const { InfiniteScroll, List, Skeleton } = require("@home/components");

const styles = {
  scrollContainer: {
    height: 400,
    overflow: 'auto',
    padding: '0 16px',
    borderBottom: '1px solid rgba(140, 140, 140, 0.35)',
  }
}

export default function Root(props) {

  console.log('[props]', props);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadMoreData = () => {
    if (loading) {
      return;
    }

    setLoading(true);

    api.fetchButchProducts({ limit: products.length + 10})
      .then((res) => {
        setProducts(res.products);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadMoreData()
  }, []);


  return (
    <section>
      <div id="scrollableDiv"
        style={styles.scrollContainer}>
        <InfiniteScroll
          dataLength={products.length}
          next={loadMoreData}
          hasMore={products.length < 100}
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={products}
            renderItem={(item) => (
              <List.Item>
                  <Skeleton avatar title={false} loading={item.loading} active>
                    <List.Item.Meta
                      // avatar={<Avatar src={item.picture.large} />}
                      title={<a href={`/catalog/?productId=${item.id}`}>{item.title}</a>}
                      description={<span>{item.brand}</span>}
                    />
                  </Skeleton>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    </section>
  );
}
