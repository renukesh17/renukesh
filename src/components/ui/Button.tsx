import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/src/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: 'bg-forest-900 text-white hover:bg-forest-800 shadow-sm uppercase tracking-widest text-xs',
      secondary: 'bg-mint-200 text-forest-900 hover:bg-mint-400/30 uppercase tracking-widest text-xs',
      outline: 'border border-forest-900/20 bg-transparent hover:bg-forest-900/5 text-forest-900 uppercase tracking-widest text-xs',
      ghost: 'bg-transparent hover:bg-forest-900/5 text-forest-900 uppercase tracking-widest text-xs',
      danger: 'bg-rose-600 text-white hover:bg-rose-700 uppercase tracking-widest text-xs',
      success: 'bg-forest-700 text-white hover:bg-forest-800 uppercase tracking-widest text-xs',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-5 py-2.5',
      lg: 'px-8 py-3.5 text-lg',
      icon: 'p-2',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-xl font-medium transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button };
