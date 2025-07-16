-- Create a table to store food analysis results
CREATE TABLE public.food_analyses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  ingredients TEXT[] DEFAULT '{}',
  calories INTEGER DEFAULT 0,
  proteins DECIMAL DEFAULT 0,
  carbs DECIMAL DEFAULT 0,
  fats DECIMAL DEFAULT 0,
  fiber DECIMAL DEFAULT 0,
  sugar DECIMAL DEFAULT 0,
  portion_size TEXT DEFAULT '',
  portion_weight INTEGER DEFAULT 0,
  health_score INTEGER DEFAULT 0,
  recommendations TEXT[] DEFAULT '{}',
  allergies TEXT[] DEFAULT '{}',
  confidence INTEGER DEFAULT 0,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.food_analyses ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own food analyses" 
ON public.food_analyses 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own food analyses" 
ON public.food_analyses 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own food analyses" 
ON public.food_analyses 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own food analyses" 
ON public.food_analyses 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_food_analyses_updated_at
BEFORE UPDATE ON public.food_analyses
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();