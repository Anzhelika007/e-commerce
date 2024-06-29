import { useEffect, useState, FormEvent, ChangeEvent, useRef } from 'react';
import {
  IFilter,
  IProductResponseCategory,
} from '../../../types/Product/InterfaceProduct';
import {
  filterProductsInfo,
  filterProducts,
} from '../../../services/api/getProducts';

type Props = {
  getProductsFilter: (data: IProductResponseCategory) => void;
  offset: number;
  sort: string;
  setFilterSetting: React.Dispatch<React.SetStateAction<IFilter>>;
  handleClearFilters: () => void;
};

export const defaultFilterSettings: IFilter = {
  priceMin: 0,
  priceMax: 0,
  color: [],
  model: [],
  fractionDigits: 0,
};

function FilterCatalog({
  getProductsFilter,
  offset,
  sort,
  setFilterSetting,
  handleClearFilters,
}: Props): React.ReactElement {
  const formRefFilter = useRef<HTMLFormElement>(null);

  const [filterPanelProps, setFilterPanel] = useState(defaultFilterSettings);
  const [priceMin, setPriceMin] = useState(defaultFilterSettings.priceMin);
  const [priceMax, setPriceMax] = useState(defaultFilterSettings.priceMax);
  const [fractionDigits, setFractionDigits] = useState(
    defaultFilterSettings.fractionDigits
  );
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);

  useEffect(() => {
    const filterInfo = async () => {
      const filterInfoResponse = await filterProductsInfo();
      setFilterPanel(filterInfoResponse);
      setPriceMin(filterInfoResponse.priceMin);
      setPriceMax(filterInfoResponse.priceMax);
      setFractionDigits(filterInfoResponse.fractionDigits);
    };

    filterInfo();
  }, []);

  const handleColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedColors((prevSelectedColors) => [...prevSelectedColors, value]);
    } else {
      setSelectedColors((prevSelectedColors) =>
        prevSelectedColors.filter((color) => color !== value)
      );
    }
  };

  const handleModelChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedModels((prevSelectedModels) => [...prevSelectedModels, value]);
    } else {
      setSelectedModels((prevSelectedModels) =>
        prevSelectedModels.filter((model) => model !== value)
      );
    }
  };

  const onSubmitFilter = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData: IFilter = {
      priceMin,
      priceMax,
      color: selectedColors,
      model: selectedModels,
      fractionDigits,
    };
    setFilterSetting(formData);
    const result = await filterProducts(formData, offset, sort);

    getProductsFilter(result);
  };

  // Clear filter
  const handleClearFiltersForm = async () => {
    // set default val
    setPriceMin(defaultFilterSettings.priceMin);
    setPriceMax(defaultFilterSettings.priceMax);
    setFractionDigits(defaultFilterSettings.fractionDigits);
    setSelectedColors(defaultFilterSettings.color);
    setSelectedModels(defaultFilterSettings.model);

    // clear form fields
    if (formRefFilter.current) {
      const form = formRefFilter.current;
      const inputs = form.querySelectorAll('input');
      inputs.forEach((input: HTMLInputElement) => {
        if (input.type === 'checkbox') {
          const checkbox = input as HTMLInputElement;
          checkbox.checked = false;
        } else {
          const inputText = input as HTMLInputElement;
          inputText.value = '';
        }
      });
    }
    // catalog => set default val and change state props products => call useEff
    handleClearFilters();
  };

  return (
    <details>
      <summary>Filter</summary>
      <form
        ref={formRefFilter}
        className="form-filter"
        onSubmit={onSubmitFilter}
      >
        <fieldset className="filter-price">
          <legend>Price</legend>
          <label htmlFor="priceMin">
            Min price
            <input
              className="input-text"
              type="number"
              id="priceMin"
              placeholder={`${filterPanelProps.priceMin}`}
              onChange={(e) => setPriceMin(Number(e.target.value))}
            />
          </label>
          <label htmlFor="priceMax">
            Max price
            <input
              className="input-text"
              type="number"
              id="priceMax"
              placeholder={`${filterPanelProps.priceMax}`}
              onChange={(e) => setPriceMax(Number(e.target.value))}
            />
          </label>
        </fieldset>
        <fieldset className="filter-fieldset filter-color">
          <legend>Color</legend>
          {filterPanelProps.color.map((color) => (
            <label htmlFor={color} key={`${color}-c`}>
              <input
                className="input-checkbox"
                type="checkbox"
                id={color}
                name="filter-color"
                value={color}
                onChange={handleColorChange}
              />
              {color}
            </label>
          ))}
        </fieldset>
        <fieldset className="filter-fieldset filter-model">
          <legend>Model</legend>

          {filterPanelProps.model.map((model) => (
            <label htmlFor={`${model}-m`} key={`${model}-m`}>
              <input
                className="input-checkbox"
                type="checkbox"
                id={`${model}-m`}
                name="filter-model"
                value={model}
                onChange={handleModelChange}
              />
              {model}
            </label>
          ))}
        </fieldset>
        <div className="filter-box-btn">
          <button
            type="button"
            className="filter-btn"
            onClick={handleClearFiltersForm}
          >
            Clear
          </button>
          <button type="submit" className="filter-btn">
            Send
          </button>
        </div>
      </form>
    </details>
  );
}

export default FilterCatalog;
