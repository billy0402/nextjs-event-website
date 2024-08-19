import type { NewsIn, NewsOut } from '@/schema/news';
import instance from '@/services/instance';

export async function apiNewsList() {
  const response = await instance.get<NewsOut[]>('/news');
  return response.data;
}

export async function apiNewsRetrieve(id: string) {
  const response = await instance.get<NewsOut>(`/news/${id}`);
  return response.data;
}

export async function apiNewsCreate(data: NewsIn) {
  const response = await instance.post<NewsOut>('/news', data);
  return response.data;
}

export async function apiNewsUpdate(id: string, data: NewsIn) {
  const response = await instance.put<NewsOut>(`/news/${id}`, data);
  return response.data;
}

export async function apiNewsPartUpdate(id: string, data: Partial<NewsIn>) {
  const response = await instance.patch<NewsOut>(`/news/${id}`, data);
  return response.data;
}

export async function apiNewsDestroy(id: string) {
  const response = await instance.delete<null>(`/news/${id}`);
  return response.data;
}
