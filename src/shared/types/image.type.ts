export type TImage = {
  userId: string;
  name: string;
  imageUrl: string;
  createdAt: Date;
  imageId: number;
};

export type TPhoto = {
  blurredDataUrl: string | undefined;
} & TImage;
