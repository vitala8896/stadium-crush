import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getFavorite,
  getFacetByQuery,
  executeDocumentList,
  getSummary,
  getNavigate,
  exportQuery,
  getExportPackages,
  getTimeSeries
} from '../actions';

const initialState = {
  favorite: 'idle',
  navigationStatus: 'idle',
  documentStatus: 'idle',
  zipFileStatus: 'idle',
  facetStatus: 'idle',
  exportPackageStatus:'idle',
  facetSummeryStatus: 'idle',
  timeGraphStatus: 'idle',
  navigationChild: {},
  graphData: {},
  filterGraphData: {},
  documents: [],
  clickedItems: [],
  tagCloud: [],
  dateQuery: {},
  navigateRecord: {},
  queryPath: [],
  advanceSearchValues: {},
  timeSeriesData: {},
  advanceSearch: {},
  exportID: [],
  exportData:[]
};

export const getFavorites = createAsyncThunk('facets/favorite', async () => {
  const res = await getFavorite();
  return res.data;
});
export const getFacets = createAsyncThunk('facets/retrieve', async (query) => {
  const { urlParam, queryParam } = query;
  const res = await getFacetByQuery(urlParam, queryParam);
  return res.data;
});

export const getFacetsByQuery = createAsyncThunk('facets/retriveByQuery', async (query) => {
  const { urlParam, data } = query;
  const res = await getFacetByQuery(urlParam, data);
  return res.data;
});

export const getFacetsForCloud = createAsyncThunk('facets/cloud', async (query) => {
  const { urlParam, data } = query;
  const res = await getFacetByQuery(urlParam, data);
  return res.data;
});

export const getDocuments = createAsyncThunk('facets/documents', async (query) => {
  const { queryItems, searchPoint, sort } = query;
  const res = await executeDocumentList(queryItems, searchPoint, sort);
  return res.data;
});

export const getFacetSummary = createAsyncThunk('facets/summery', async (query) => {
  const { queryItems, searchPoint, sort } = query;
  const res = await getSummary(queryItems, searchPoint, sort);
  return res.data;
});
export const doExportQuery = createAsyncThunk('facets/export', async (query) => {
  const { queryItems, searchPoint, sort } = query;
  console.log("doExportQuery: query.queryItems="+queryItems);
  const res = await exportQuery(queryItems, searchPoint, sort);
  return res.data;
});
export const getDownloadSinglefile = createAsyncThunk('facets/export-list', async (id) => {
  console.log("getDownloadSinglefile id="+id);
  const res = await getExportPackages(id);
  return res.data;
});
export const getNavigateData = createAsyncThunk('facets/navigate', async (query) => {
  const res = await getNavigate(query);
  return res.data;
});

export const timeSeriesGraph = createAsyncThunk('facets/timeSeries', async (query) => {
  const res = await getTimeSeries(query);
  return res.data;
});

const facetSlice = createSlice({
  name: 'facets',
  initialState,

  reducers: {
    setClickedItems: (state, action) => ({
      ...state,
      clickedItems: [
        ...new Map((action.payload ?? []).map((item) => [item.filter.value, item])).values()
      ]
    }),
    clickedItem: (state, action) => {
      const newData = [...state.clickedItems, action.payload];

      const data = {
        ...state,
        clickedItems:
          (newData.length > 0 && [
            ...new Map(newData.map((item) => [item.filter.value, item])).values()
          ]) ||
          []
      };

      return data;
    },

    clearClickedItem: (state, action) => {
      const data = {
        ...state,
        clickedItems: []
      };

      return data;
    },

    addDate: (state, action) => {
      const data = {
        ...state,
        dateQuery: action.payload
      };
      console.log('facet.js:addDate Adding date to query. ', data);
      return data;
    },

    removeItem: (state, action) => {
      const newData = [...state.clickedItems];

      const removeItem = newData.filter(
        (item) => item.filter.value !== action.payload.filter.value
      );

      const data = {
        ...state,
        clickedItems:
          (removeItem.length > 0 && [
            ...new Map(removeItem.map((item) => [item.filter.value, item])).values()
          ]) ||
          []
      };

      return data;
    },

    filterItem: (state, action) => {
      const data = {
        ...state,
        filterGraphData: {
          ...state.filterGraphData,
          ...action.payload
        }
      };

      return data;
    },

    addQueryPath: (state, action) => {
      const data = {
        ...state,
        queryPath: [...state.queryPath, action.payload]
      };

      return data;
    },

    deleteQueryPath: (state, action) => {
      let data;

      if (action.payload !== undefined) {
        data = {
          ...state,
          queryPath:
            state.queryPath.length > 1
              ? [...state.queryPath.slice(0, action.payload + 1)]
              : [...state.queryPath]
        };
      } else {
        data = {
          ...state,
          queryPath: state.queryPath.length > 1 ? [...state.queryPath.pop()] : [...state.queryPath]
        };
      }

      return data;
    },

    setAdvanceSearchValues: (state, action) => {
      const data = {
        ...state,
        advanceSearchValues: {
          ...state.advanceSearchValues,
          ...action.payload
        }
      };

      return data;
    },

    setNavigationChild: (state, action) => {
      const data = {
        ...state,
        advanceSearch: action.payload
      };

      return data;
    }
  },

  extraReducers: {
    [getFacets.pending]: (state) => {
      return {
        ...state,
        facetStatus: 'loading'
      };
    },

    [getFacets.fulfilled]: (state, action) => {
      // debugger;
      return {
        ...state,
        facetStatus: 'loaded',
        navigationChild: {
          ...state.navigationChild,
          [action.meta.arg.urlParam]: action.payload
        },
        graphData: {
          ...state.graphData,
          [action.meta.arg.urlParam]: action.payload
        },
        advanceSearch: {
          ...state.advanceSearch,
          [action.meta.arg.urlParam]: action.payload
        }
      };
    },

    [getFacetsByQuery.pending]: (state, action) => {
      return {
        ...state,
        facetStatus: 'loading'
      };
    },
    [getFacetsByQuery.fulfilled]: (state, action) => {
      return {
        ...state,
        facetStatus: 'loaded',
        graphData: {
          ...state.graphData,
          [action.meta.arg.urlParam]: action.payload
        }
      };
    },

    [getFacetsForCloud.pending]: (state, action) => {
      return {
        ...state,
        facetStatus: 'loading'
      };
    },
    [getFacetsForCloud.fulfilled]: (state, action) => {
      return {
        ...state,
        facetStatus: 'loaded',
        tagCloud: action.payload
      };
    },

    [getDocuments.pending]: (state, action) => {
      return {
        ...state,
        documentStatus: 'loading'
      };
    },
    [getDocuments.fulfilled]: (state, action) => {
      return {
        ...state,
        documentStatus: 'loaded',
        documents: action.payload
      };
    },
    [doExportQuery.pending]: (state, action) => {
      return {
        ...state,
        zipFileStatus: 'loading'
      };
    },
    [doExportQuery.fulfilled]: (state, action) => {
      return {
        ...state,
        zipFileStatus: 'loaded',
        exportID: action.payload
      };
    },
    [getDownloadSinglefile.pending]: (state, action) => {
      return {
        ...state,
        exportPackageStatus: 'loading'
      };
    },
    [getDownloadSinglefile.fulfilled]: (state, action) => {
      return {
        ...state,
        exportPackageStatus: 'loaded',
        exportData: action.payload
      };
    },
    [getFacetSummary.pending]: (state, action) => {
      return {
        ...state,
        facetSummeryStatus: 'loaded'
      };
    },
    [getFacetSummary.fulfilled]: (state, action) => {
      return {
        ...state,
        facetSummeryStatus: 'loaded',
        summery: action.payload
      };
    },

    [getNavigateData.pending]: (state, action) => {
      return {
        ...state,
        navigationStatus: 'loading'
      };
    },
    [getNavigateData.fulfilled]: (state, action) => {
      return {
        ...state,
        navigationStatus: 'loaded',
        navigateRecord: action.payload
      };
    },

    [timeSeriesGraph.pending]: (state, action) => {
      return {
        ...state,
        timeGraphStatus: 'loading'
      };
    },
    [timeSeriesGraph.fulfilled]: (state, action) => {
      let series;
      if (action.payload===undefined || action.payload.series===undefined) {
        series={};
      } else {
        series=action.payload.series;
      }
      return {
        ...state,
        timeGraphStatus: 'loaded',
        timeSeriesData: series
      };
    }
  }
});

const { reducer, actions } = facetSlice;

export const {
  setClickedItems,
  clickedItem,
  removeItem,
  clearClickedItem,
  filterItem,
  addDate,
  addQueryPath,
  deleteQueryPath,
  setAdvanceSearchValues,
  setNavigationChild
} = actions;

export default reducer;
