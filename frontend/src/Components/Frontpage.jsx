import CreateBinButton from './CreateBinButton';
import Header from './Header';

const FrontPage = () => {
  return (
    <div>
      <Header />
      <main>
        <p>Get a URL where you can receive and inspect HTTP requests and webhooks notifications!</p>
        <CreateBinButton />
      </main>
    </div>
  );
}

export default FrontPage;
