import { privateApi } from './index';

const purchaseOrdersApi = privateApi.injectEndpoints({
  endpoints: builder => ({
    getPurchaseOrdersList: builder.query({
      query: params => ({
        url: '/api/accounting/purchases/purOrders/',
        method: 'GET',
        params,
      }),
      providesTags: ['getPurchaseOrdersList'],
    }),
    getSinglePurchaseOrder: builder.query({
      query: id => ({
        url: `api/accounting/purchases/purOrders/${id}/`,
        method: 'GET',
      }),
      providesTags: ['getSinglePurchaseOrder'],
    }),
    getLatestPurchaseOrderNumber: builder.query({
      query: () => ({
        url: 'api/accounting/purchases/purOrders/latest',
        method: 'GET',
      }),
      providesTags: ['getLatestPurchaseOrderNumber'],
    }),
    addPurchaseOrder: builder.mutation({
      query: payload => ({
        url: '/api/accounting/purchases/purOrders/',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: [
        'getItemPurchaseOrder',
        'getLatestPurchaseOrderNumber',
        'getPurchaseOrdersList',
        'getItemPurchaseOrder',
        'getSinglePurchaseOrder',
        'getSupplierTransactions',
      ],
    }),
    deletePurchaseOrder: builder.mutation({
      query: id => ({
        url: `/api/accounting/purchases/purOrders/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: [
        'getLatestPurchaseOrderNumber',
        'getPurchaseOrdersList',
        'getItemPurchaseOrder',
        'getItemPurchaseOrder',
        'getSupplierTransactions',
      ],
    }),
    editPurchaseOrder: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/api/accounting/purchases/purOrders/${id}/`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: [
        'getLatestPurchaseOrderNumber',
        'getPurchaseOrdersList',
        'getItemPurchaseOrder',
        'getSinglePurchaseOrder',
        'getItemPurchaseOrder',
        'getSupplierTransactions',
      ],
    }),
    addPurchaseOrderDocument: builder.mutation({
      query: ({ id, payload }) => ({
        url: `api/accounting/purchases/purOrders/${id}/uploadDoc`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['getPurchaseOrdersList'],
    }),
    deletePurchaseOrderDocument: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/api/accounting/purchases/purOrders/${id}/`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['getPurchaseOrdersList'],
    }),
    changePurchaseOrderStatusToIssued: builder.mutation({
      query: id => ({
        url: `api/accounting/purchases/purOrder/${id}/issued`,
        method: 'GET',
      }),
      invalidatesTags: ['getSinglePurchaseOrder', 'getPurchaseOrdersList'],
    }),
    uploadPurchaseOrderDocumentFile: builder.mutation({
      query: ({ id, payload }) => ({
        url: `api/accounting/purchases/purOrders/${id}/uploadDoc`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['getSinglePurchaseOrder'],
    }),
    deletePurchaseOrderDocumentFile: builder.mutation({
      query: ({ id }) => ({
        url: `api/accounting/purchases/purOrders/docs/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['getSinglePurchaseOrder'],
    }),
  }),
});

export const {
  useGetPurchaseOrdersListQuery,
  useGetSinglePurchaseOrderQuery,
  useGetLatestPurchaseOrderNumberQuery,
  useAddPurchaseOrderMutation,
  useEditPurchaseOrderMutation,
  useDeletePurchaseOrderMutation,
  useAddPurchaseOrderDocumentMutation,
  useChangePurchaseOrderStatusToIssuedMutation,
  useUploadPurchaseOrderDocumentFileMutation,
  useDeletePurchaseOrderDocumentFileMutation,
} = purchaseOrdersApi;
