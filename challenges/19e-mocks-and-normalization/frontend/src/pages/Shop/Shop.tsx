import Navbar from '../../components/Navbar/Navbar';
import React from 'react';
import Banner from 'components/Banner/Banner';
import Items from 'components/Items/Items';
import Footer from 'components/Footer/Footer';

const Shop = () => {
  return (
    <React.Fragment>
      <Navbar />
      <main className="mt-11">
        <Banner />
        {/*shop*/}
        <section className="container-xxl mb-5">
          <div className="row align-content-evenly justify-content-around">
            <Items />
          </div>
        </section>
        {/*shop*/}
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default Shop;
