export interface ShopifyThemeDTO {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  role: string;
  theme_store_id: string;
  previewable: boolean;
  processing: boolean;
  admin_graphql_api_id: string;
}

export interface ShopifyThemesResponse {
  themes: ShopifyThemeDTO[];
  errors?: string;
}
