import './catalog.scss';
import {
  useEffect,
  useState,
  useCallback,
  ChangeEvent,
  MouseEventHandler,
} from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getCategories,
  getProductsSorted,
  SortField,
  searchProducts,
} from '../../services/api/getProducts';
import { IProductResponseCategory } from '../../types/Product/InterfaceProduct';
import { ICategoriesResponse } from '../../types/Product/InterfaceCategories';
import {
  formattedDataForCategory,
  formattedDataForCardInCategory,
} from './formattedData';
import {
  ProductCard,
  ProductCardProps,
} from '../../components/productCard/productCard';
import {
  CategoryProps,
  Category,
} from '../../components/asideCatalogCategory/asideCatalogCategory';
import FilterCatalog from '../../components/forms/filterCatalog/filterCatalog';
import Spinner from '../../components/spinner/Spinner';

function Catalog() {
  const categoriesAll: CategoryProps[] = [];
  const navigate = useNavigate();

  const [productCardProps, setProductCardProps] = useState<ProductCardProps[]>(
    []
  );
  const [categoryProps, setCategoryProps] = useState(categoriesAll);
  const [categoryId, setCategoryId] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [messageError, setMessageError] = useState(false);

  // Handle category sorted
  const handleSortChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const sortFieldKey = event.target.value as SortField;
    const sortedProducts = await getProductsSorted(categoryId, sortFieldKey);
    const sortedProductsProps = formattedDataForCardInCategory(sortedProducts);
    setProductCardProps(sortedProductsProps);
  };
  // Handle Search Panel
  const handleChangeInputSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  // Message 'Not found'
  const showMessageErrorSearch = useCallback(() => {
    setMessageError(true);
    setTimeout(async () => {
      setMessageError(false);
      setCategoryId(categoryId);
      const productsAllGet: IProductResponseCategory =
        await getProductsSorted(categoryId);
      const productsProps = formattedDataForCardInCategory(productsAllGet);
      setProductCardProps(productsProps);
    }, 3000);
  }, [categoryId, setMessageError, setCategoryId, setProductCardProps]);
  const handleSearchPanel: MouseEventHandler = async () => {
    if (searchQuery.length > 1) {
      const searchResponse = await searchProducts(searchQuery);
      if (!searchResponse.total) {
        showMessageErrorSearch();
      }
      const searchResponseProductProps =
        formattedDataForCardInCategory(searchResponse);
      setProductCardProps(searchResponseProductProps);
      setSearchQuery('');
    }
  };
  // get products in filter
  const getProductsFilter = useCallback(
    (data: IProductResponseCategory) => {
      if (!data.results[0]) {
        showMessageErrorSearch();
      }
      const productsProps = formattedDataForCardInCategory(data);
      setProductCardProps(productsProps);
    },
    [showMessageErrorSearch]
  ); // sort. filter

  useEffect(() => {
    const products = async () => {
      try {
        const productsAllGet: IProductResponseCategory =
          await getProductsSorted(categoryId);
        const productsProps = formattedDataForCardInCategory(productsAllGet);
        setProductCardProps(productsProps);
      } catch {
        setError('Failed to fetch products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    const categories = async () => {
      const categoriesAllGet: ICategoriesResponse = await getCategories();
      const categoriesAllData = formattedDataForCategory(categoriesAllGet);
      setCategoryProps(categoriesAllData);
    };
    products();
    categories();
  }, [categoryId]); // sort. filter

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="catalog">
      <h2 className="catalog-title">Catalog</h2>
      <div className="catalog-wrapper">
        <aside className="categories">
          {categoryProps.map((category) => (
            <Category
              key={category.id}
              name={category.name}
              id={category.id}
              onClick={() => setCategoryId(category.id)}
              isCurrent={category.id === categoryId}
            />
          ))}
          <FilterCatalog getProductsFilter={getProductsFilter} />
        </aside>
        <div className="catalog-products">
          <div className="catalog-sort">
            <label htmlFor="site-search" className="search-label">
              <input
                type="search"
                id="site-search"
                name="search"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleChangeInputSearch}
                className="search-input"
              />
              <button
                className="search-btn"
                type="button"
                onClick={handleSearchPanel}
              >
                Search
              </button>
            </label>
            <select
              id="sorted-products"
              onChange={handleSortChange}
              className="select-input"
            >
              <option value={SortField.Default}>Sort by</option>
              <option value={SortField.PriceAsc}>Lowest price</option>
              <option value={SortField.PriceDesc}>Highest price</option>
              <option value={SortField.CreatedAt}>What&apos;s New</option>
              <option value={SortField.NameAsc}>Name (A To Z)</option>
              <option value={SortField.NameDesc}>Name (Z To A)</option>
            </select>
          </div>
          <div className="catalog-product" id="catalog-product">
            {messageError
              ? 'Product not found'
              : productCardProps.map((product) => (
                  <ProductCard
                    {...product}
                    key={product.id}
                    onClick={() => navigate(`/product/${product.id}`)}
                  />
                ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Catalog;
