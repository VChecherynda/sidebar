import { useEffect, useState } from "react";
const api = require("@home/api");
const { List, Button, Typography } = require("@home/components");

export default function Root(props) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.fetchProducts();

      setProducts(data?.products);
    };

    fetchData();
  }, []);

  return (
    <section id="sidebar">
      <List
        header={<div>Header</div>}
        footer={<div>Footer</div>}
        bordered
        dataSource={products}
        renderItem={(item) => (
          <List.Item>
            <Typography.Text>{item.brand}</Typography.Text>
          </List.Item>
        )}
      />
    </section>
  );
}
