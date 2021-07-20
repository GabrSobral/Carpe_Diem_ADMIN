export interface Question{
  id: string;
  body: string;
  category: string;
}

export interface FileProps {
  id: string;
  name: string;
  format: string;
  duration: number;
  url: string;
  size?: number
  category: string;
  created_at: Date;
}

export interface Activity extends Index{
  id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  body: string;
  category: Category
  files: FileProps[]
}
interface Index{
  index: number;
}

export interface Category{
  id: string;
  name: string;
}