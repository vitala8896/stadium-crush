import { queryAPI } from './axios_instance';

export const getRecord = async () => {
  const data = await queryAPI
    .post('/list', {
      queryItems: [
        {
          prefix: 'must',
          filter: {
            facet: 'organization',
            value: 'Enron'
          }
        },

        {
          prefix: 'may',
          filter: {
            facet: 'person',
            value: 'Louise Kitchen'
          }
        },

        {
          prefix: 'not',
          filter: {
            facet: 'person',
            value: 'Karima Husain'
          }
        },

        {
          prefix: 'must',
          filter: 'Dow Jones'
        }
      ],

      sort: {
        field: 'title',
        order: 'desc'
      }
    })
    .then((res) => res)
    .catch((err) => err);

  return data;
};
