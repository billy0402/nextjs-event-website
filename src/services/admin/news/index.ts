import type { NewsIn, NewsOut } from '@/schema/news';
import instance from '@/services/instance';

export async function apiAdminNewsList() {
  const response = await instance.get<NewsOut[]>('/admin/news');
  return response.data;
}

export async function apiAdminNewsRetrieve(id: string) {
  const response = await instance.get<NewsOut>(`/admin/news/${id}`);
  return response.data;
}

export async function apiAdminNewsCreate(data: NewsIn) {
  const response = await instance.post<NewsOut>('/admin/news', data);
  return response.data;
}

export async function apiAdminNewsUpdate(id: string, data: NewsIn) {
  const response = await instance.put<NewsOut>(`/admin/news/${id}`, data);
  return response.data;
}

export async function apiAdminNewsPartUpdate(
  id: string,
  data: Partial<NewsIn>,
) {
  const response = await instance.patch<NewsOut>(`/admin/news/${id}`, data);
  return response.data;
}

export async function apiAdminNewsDestroy(id: string) {
  const response = await instance.delete<null>(`/admin/news/${id}`);
  return response.data;
}
