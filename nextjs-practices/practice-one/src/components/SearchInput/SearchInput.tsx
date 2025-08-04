import { forwardRef } from 'react';

// import icons
import { Search } from 'lucide-react';

// import components
import { Input } from '@/components/common/ui/input';

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
