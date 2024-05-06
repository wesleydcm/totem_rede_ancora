import { useState } from "react";
import ProductCard from "../../components/Product/ProductCard";
import Title from "../../components/Title";
import Button from "../../components/Button";
import { formatCurrency } from "../../utils/formatCurrency";

export default function Cart({ cartProducts, setCartProducts }) {


  function updateQuantity(newValue, index) {
    setCartProducts(prevProducts => {
      const updatedProducts = [...prevProducts]
      updatedProducts[index] = { ...updatedProducts[index], qtd: newValue };
      return updatedProducts;
    });
  }

  function deleteProduct(index) {
    setCartProducts(prevProducts => {
      const updatedProducts = [...prevProducts];
      updatedProducts.splice(index, 1);
      return updatedProducts;
    });
  }

  const total = cartProducts.reduce((accumulator, currentValue) => accumulator + (parseInt(currentValue.qtd) * parseFloat(currentValue.price)), 0);

  return (
    <>

      <Title page={'Carrinho de compra'} />

      <div className="overflow-y-auto px-5" style={{
        height: 'calc(100% - 22rem)'
      }}>

        <div className="row justify-content-center gap-3 no-gutters pb-5">

          {cartProducts.map((product, index) => (
            <ProductCard key={index}
              index={index}
              product={product.name}
              description={product.description}
              price={product.price}
              qtd={product.qtd}
              updateQuantity={updateQuantity}
              deleteProduct={deleteProduct}
            />
          ))}

        </div>

      </div>

      <div
        className="d-flex justify-content-between align-items-center"
        style={{
          height: "145px",
          padding: '1.5rem 3rem'
        }}
      >
        <div>
          <span className="fs-1 fw-medium d-block block">{formatCurrency(total)}</span>
          <span className="fs-4 d-block text-uppercase">Valor total</span>
        </div>

        <Button name={'Finalizar pedido'} type={'submit'} />
      </div>

    </>
  );
}
