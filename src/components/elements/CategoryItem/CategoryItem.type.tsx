export interface ImageCategoryItemType {
  params: 'fruit' | 'veggie' | 'grain' | 'mushroom';
  title: string;
}

export interface TextCategoryItemType {
  type: 'search' | 'product';
  _id?: number;
  params: string;
  title: string;
  isClick: boolean;
}

export interface SelectProductItemType {
  params: 'crop' | 'experience' | 'gardening';
  title: string;
}
