import { queryAPI,upDownAPI } from './axios_instance';

export const getFavorite = async () => {
  const data = await fetch('http://dev.stadiumcrush.com/api/v1/playerLogin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJzdGFkaXVtQ3J1c2hKV1QiLCJzdWIiOiIwODNiZjNjOC1iOTM2LTQ2OTEtYWY4Yi00ZTJiODM5YTFjNTciLCJhdXRob3JpdGllcyI6WyJST0xFX1BMQVlFUiJdLCJpYXQiOjE2OTAzNTIzODksImV4cCI6MTY5Mjk4MDM4OX0.tE3mUP0kEDLBlLONRSXk9TySvZqf5aBgfJnr0al2qD_3zuZ2Iy_2G__6ENJkPzZ9FUZ-ybdHzeKEFm7Gd87Wig`
    },
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('Помилка', error);
    });
  return data;
};

export const getFacetByQuery = async (urlParam, query) => {
  const data = await queryAPI
    .post(`/facet/${urlParam}`, { queryItems: query ? [...query] : [] })
    .then((res) => res)
    .catch((err) => err);

  return data;
};

export const getAllFacet = async () => {
  const data = await queryAPI
    .post(`/facets`, { queryItems: [] })
    .then((res) => res)
    .catch((err) => err);

  return data;
};

export const executeDocumentList = async (queryItems, searchPoint, sort) => {
  let data;
  if (searchPoint) {
      data = await queryAPI
          .post(`/list`, { queryItems, searchPoint, sort, "size":100 })
          .then((res) => res)
          .catch((err) => err);
  } else {
      data = await queryAPI
          .post(`/list`, { queryItems, sort, "size":100 })
          .then((res) => res)
          .catch((err) => err);
  }

  return data;
};

// Call the view API and return the response.
export const DocumentView = async (urlParam, queryParam) => {
  const data = await queryAPI
    .post(`/view/${urlParam}`, null, { params: queryParam })
    .then((res) => res.data)
    .catch((err) => err);
  if (data!==undefined && data.hasOwnProperty('body-json') && (data['body-json']).hasOwnProperty('renderableURL')) {
    console.log("action/facets.js DocumentView renderable="+data['body-json'].renderableURL);
  }
  return data;
};

export const getSummary = async (queryItems) => {
  const data = await queryAPI
    .post(`/summary`, { queryItems })
    .then((res) => res)
    .catch((err) => err);

  return data;
};

export const exportQuery = async (queryItems) => {
  console.log("exportQuery queryItems="+queryItems);
  const data = await queryAPI
    .post(`/query/export`, { queryItems })
    .then((res) => res)
    .catch((err) => err);
  return data;
};

export const getExportPackages = async (id) => {
  const data = await upDownAPI
    .get(`/export-list?id=${id}`)
    .then((res) => res)
    .catch((err) => {
        console.log("ERROR Cannot get list of export packages. "+err);
        return err ;
      });

  return data;
};

export const getNavigate = async ({ urlParam, body }) => {
  let data;
  // debugger;
  if (urlParam) {
    data = await queryAPI
      .post(`/pathHierarchy`, body, { params: urlParam })
      .then((res) => res)
      .catch((err) => err);
  } else {
    data = await queryAPI
      .post(`/pathHierarchy`, body)
      .then((res) => res)
      .catch((err) => err);
  }

  return data;
};

export const getTimeSeries = async ({ urlParam, body }) => {
  let data;

  data = await queryAPI
    .post(`/timeseries`, body, { params: urlParam })
    .then((res) => res)
    .catch((err) => err);

  return data;
};
