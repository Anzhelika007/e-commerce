import './catalog.scss';
import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Cart } from '../../redux/store/cartSlice';
import {
  getCategories,
  getProductsSorted,
  searchProducts,
  filterProducts,
} from '../../services/api/getProducts';
import {
  IFilter,
  IProductResponseCategory,
} from '../../types/Product/InterfaceProduct';
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
import FilterCatalog, {
  defaultFilterSettings,
} from '../../components/forms/filterCatalog/filterCatalog';
import Spinner from '../../components/spinner/Spinner';
import Pagination from '../../components/pagination/pagination';
// Basket
import { checkProductsInCart, getCart } from '../../services/api/cart';
import { AppMessage } from '../../services/api/getAppToken';
// import { useAppSelector } from '../../redux/hooks';
import { useAppDispatch } from '../../redux/hooks';

const LIMIT = 8;

function Catalog() {
  const categoriesAll: CategoryProps[] = [];
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  // Products
  const [productCardProps, setProductCardProps] = useState<ProductCardProps[]>(
    []
  );
  // Categories
  const [categoryProps, setCategoryProps] = useState(categoriesAll);
  const [categoryId, setCategoryId] = useState('');
  // Errors
  const [error, setError] = useState<string | null>(null);
  const [messageError, setMessageError] = useState(false);
  // Pagination
  const [offset, setOffset] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  // Spinner
  const [loading, setLoading] = useState(true);
  // Sorting
  const [sortKey, setSortKey] = useState('createdAt asc');
  const [searchQuery, setSearchQuery] = useState('');
  // Filter
  const [filterSetting, setFilterSetting] = useState<IFilter>(
    defaultFilterSettings
  );

  function showToast(result: AppMessage<Cart>) {
    if (result.isError) {
      toast.error(result.message!);
    } else {
      toast.success(result.message!);
    }
  }

  // Handle category sortedSelect
  const handleSortChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const sortFieldKey = event.target.value;
    setSortKey(sortFieldKey);
    setOffset(0);
  };

  // Pagination
  const getCountPagination = (count: number) => {
    const getCountPages = Math.ceil(count / LIMIT);
    const countPagination = getCountPages > 1 ? getCountPages : 0;
    setTotalPages(countPagination);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setMessageError(false);
  };
  // Message 'Not found' search/filter
  const showMessageErrorSearch = useCallback(() => {
    setMessageError(true);
    setOffset(0);
  }, [setMessageError]);

  // Get products in filter
  const getProductsFilter = useCallback(
    (data: IProductResponseCategory) => {
      if (!data.results[0]) {
        getCountPagination(data.total);
        setOffset(0);
        showMessageErrorSearch();
      }
      setMessageError(false);
      const productsProps = formattedDataForCardInCategory(data);
      setProductCardProps(checkProductsInCart(productsProps));
      getCountPagination(data.total);
    },
    [showMessageErrorSearch]
  );

  useEffect(() => {
    const products = async () => {
      try {
        const productsAllGet: IProductResponseCategory =
          await getProductsSorted(categoryId, offset, sortKey);
        getCountPagination(productsAllGet.total);
        const productsProps = formattedDataForCardInCategory(productsAllGet);
        await getCart(dispatch);
        setProductCardProps(checkProductsInCart(productsProps));
      } catch {
        setError('Failed to fetch products. Please try later.');
      } finally {
        setLoading(false);
      }
    };
    const categories = async () => {
      const categoriesAllGet: ICategoriesResponse = await getCategories();
      const categoriesAllData = formattedDataForCategory(categoriesAllGet);
      setCategoryProps(categoriesAllData);
    };
    if (!searchQuery || !filterSetting) {
      if (Object.is(filterSetting, defaultFilterSettings)) {
        products();
      }
    }
    categories();
  }, [categoryId, offset, sortKey, searchQuery, filterSetting, dispatch]);

  useEffect(() => {
    const searchProductsQuery = async () => {
      if (searchQuery.length > 1) {
        const searchResponse = await searchProducts(
          searchQuery,
          offset,
          sortKey
        );

        if (!searchResponse.total) {
          showMessageErrorSearch();
          getCountPagination(0);
        } else {
          setMessageError(false);
          const searchResponseProductProps =
            formattedDataForCardInCategory(searchResponse);
          setProductCardProps(checkProductsInCart(searchResponseProductProps));
          getCountPagination(searchResponse.total);
        }
      }
    };
    searchProductsQuery();
  }, [searchQuery, showMessageErrorSearch, offset, sortKey]);

  useEffect(() => {
    const applyFilters = async () => {
      if (
        filterSetting.priceMin ||
        filterSetting.priceMax ||
        filterSetting.color.length ||
        filterSetting.model.length
      ) {
        try {
          const filterResponse = await filterProducts(
            filterSetting,
            offset,
            sortKey
          );
          getProductsFilter(filterResponse);
        } catch {
          setError('Failed to apply filters');
        }
      }
    };
    applyFilters();
  }, [filterSetting, offset, sortKey, getProductsFilter]);

  const handleClearFilters = () => {
    setFilterSetting(defaultFilterSettings);
    setOffset(0);
    setProductCardProps([]);
    setMessageError(false);
  };

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
              // eslint-disable-next-line no-sequences
              onClick={() => (setCategoryId(category.id), setOffset(0))}
              isCurrent={category.id === categoryId}
            />
          ))}
          <FilterCatalog
            getProductsFilter={getProductsFilter}
            offset={offset}
            sort={sortKey}
            setFilterSetting={setFilterSetting}
            handleClearFilters={handleClearFilters}
          />
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
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button
                className="search-btn"
                type="button"
                onClick={() => setSearchQuery(searchQuery)}
                disabled={!searchQuery}
              >
                Search
              </button>
              <button
                className="clear-btn"
                type="button"
                onClick={handleClearSearch}
                disabled={!searchQuery}
              >
                x
              </button>
            </label>
            <select
              id="sorted-products"
              onChange={handleSortChange}
              className="select-input"
            >
              <option value="createdAt asc">Sort by</option>
              <option value="price asc">Lowest price</option>
              <option value="price desc">Highest price</option>
              <option value="createdAt desc">What&apos;s New</option>
              <option value="name.en asc">Name (A To Z)</option>
              <option value="name.en desc">Name (Z To A)</option>
            </select>
          </div>
          <div className="catalog-product" id="catalog-product">
            {messageError
              ? 'Product not found'
              : productCardProps.map((product) => (
                  <ProductCard
                    {...product}
                    key={product.id}
                    // eslint-disable-next-line react/jsx-no-bind
                    toasted={showToast}
                    onClick={() => navigate(`/product/${product.id}`)}
                  />
                ))}
          </div>
          <Pagination
            totalPages={totalPages}
            currentPage={offset / LIMIT}
            onClick={(page) => setOffset(page * LIMIT)}
          />
        </div>
      </div>
    </section>
  );
}

export default Catalog;
