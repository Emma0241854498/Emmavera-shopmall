import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Auth helpers
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data } = await supabase.auth.getSession();
  return data?.session?.user || null;
};

// Product helpers
export const getProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });
  return { data, error };
};

export const getProductsByCategory = async (categoryId: string) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category_id', categoryId)
    .order('created_at', { ascending: false });
  return { data, error };
};

export const getProduct = async (id: string) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();
  return { data, error };
};

// Category helpers
export const getCategories = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');
  return { data, error };
};

// Order helpers
export const createOrder = async (userId: string, totalAmount: number, items: any[]) => {
  const { data, error } = await supabase
    .from('orders')
    .insert([{ user_id: userId, total_amount: totalAmount, status: 'pending' }])
    .select()
    .single();
  
  if (error) return { data: null, error };
  
  // Insert order items
  const orderItems = items.map(item => ({
    order_id: data.id,
    product_id: item.product_id,
    quantity: item.quantity,
    price: item.price,
  }));
  
  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems);
  
  return { data, error: itemsError };
};

export const getOrders = async (userId: string) => {
  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  return { data, error };
};

// Review helpers
export const createReview = async (productId: string, userId: string, rating: number, comment?: string) => {
  const { data, error } = await supabase
    .from('reviews')
    .insert([{ product_id: productId, user_id: userId, rating, comment }])
    .select()
    .single();
  return { data, error };
};

export const getProductReviews = async (productId: string) => {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('product_id', productId)
    .order('created_at', { ascending: false });
  return { data, error };
};
