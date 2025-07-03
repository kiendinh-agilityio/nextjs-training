import { forwardRef } from 'react';
import { Input } from '@/components/common/ui/input';
import { Search } from 'lucide-react';

interface SearchInputProps extends React.ComponentProps<typeof Input> {}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (props, ref) => (
    <Input
      ref={ref}
      icon={<Search size={20} />}
      placeholder="Search from menu..."
      inputSize="xl"
      {...props}
    />
  ),
);

SearchInput.displayName = 'SearchInput';
