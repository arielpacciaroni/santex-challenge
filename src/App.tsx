import { Container } from './components/Container';
import { Header } from './components/Header';
import { Layout } from './components/Layout';
import { ProductList } from './components/ProductList';

function App() {
  return (
    <Layout>
      <Header />
      <Container>
        <ProductList />
      </Container>
    </Layout>
  );
}

export default App;
