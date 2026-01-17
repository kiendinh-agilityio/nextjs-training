export interface TimeSlot {
  day: string;
  delivery: string;
  operational: string;
}

export interface ContactInfo {
  title: string;
  value: string;
}

export type LoadMoreProps<T> = {
  items: T[];
  step?: number;
  initialCount?: number;
  buttonText?: string;
  className?: string;
  renderItem: (item: T, idx: number) => React.ReactNode;
};
