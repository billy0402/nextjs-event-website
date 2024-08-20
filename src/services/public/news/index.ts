import type { NewsOut } from '@/schema/news';
import instance from '@/services/instance';

export async function apiNewsList() {
  const response = await instance.get<NewsOut[]>('/news');
  return response.data;
}

export async function apiNewsRetrieve(id: string) {
  const response = await instance.get<NewsOut>(`/news/${id}`);
  return response.data;
}
