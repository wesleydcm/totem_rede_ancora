import { useState, useEffect } from "react";
import Product from "@/components/Product";
import SearchBar from "@/components/SearchBar";
import Title from "@/components/Title";
import fetchProducts from "@/utils/api/fetchProducts";
import LogoRedeAncora from "@/assets/img/logo_v1.png";
import { Link, useNavigate } from "react-router-dom";

export default function Search({
  searchTerm,
  setSearchTerm,
  user,
  loading,
  setLoading,
}) {
  const { automaker, license_plate, superbusca } = searchTerm;
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const productsSearch = async (keyword) => {
    const {
      pageResult: { data },
    } = await fetchProducts(keyword);

    setProducts(data);
  };

  const filteredProducts = products.filter((product) => {
    return product.data.aplicacoes.some(
      (vehicle) =>
        vehicle.montadora.toUpperCase() == automaker?.name?.toUpperCase()
    );
  });

  const titleText = `Produtos para ${
    license_plate
      ? `o veiculo placa: ${license_plate}`
      : `a montadora: ${automaker.name}`
  }`;

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      const {
        pageResult: { data },
      } = await fetchProducts({
        superbusca: superbusca ? superbusca : automaker?.name,
        veiculoPlaca: license_plate,
      }).finally(() => setLoading(false));

      setProducts(data);
    }
    if (!automaker.name && !license_plate) {
      navigate("/totem/dashboard");
    }
    fetchData();
  }, [automaker.name, superbusca, license_plate]);

  return (
    <>
      <div className="d-flex justify-content-between">
        <Title page={titleText} />
        <Link
          to={"/totem/dashboard/"}
          className="d-flex p-3 gap-3 align-items-center card-category rounded-1 fs-3 h-75"
        >
          Selecionar outra montadora <span className="mgc_back_fill fs-1" />
        </Link>
      </div>

      <SearchBar
        productsSearch={productsSearch}
        user={user}
        license_plate={license_plate}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <div
        className="overflow-y-auto"
        style={{
          height: "calc(100% - 20rem)",
        }}
      >
        {loading ? (
          <div className="container">
            <div className="row justify-content-center align-items-center">
              <div className="col-xs-6 text-center">
                <img src={LogoRedeAncora} alt="Imagem" className="img-fluid" />
                <h2>Carregando...</h2>
              </div>
            </div>
          </div>
        ) : (
          <Product products={license_plate ? products : filteredProducts} />
        )}
      </div>
    </>
  );
}