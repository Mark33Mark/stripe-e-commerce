// generally following the hook provided here:
// https://github.com/vaskort/custom-hook-test/blob/develop/src/hooks/useFetchedData.js

import { useEffect, useState } from "react";

const API_URL = "https://fakestoreapi.com/products";

export const useProducts = () => {
	const [loading, setLoading] = useState(true);
	const [products, setProducts] = useState([]);
	const [error, setError] = useState({});

	const fetchProducts = async (abortController) => {
		try {
			const response = await fetch(API_URL, {
				signal: abortController.signal,
			});

			const json = await response.json();
			setProducts(json);
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		const abortController = new AbortController();
		fetchProducts(abortController);

		return () => {
			abortController.abort();
		};
	}, []);

	return { loading, products, error };
};
