import Data.Ord (comparing)
import Data.List (maximumBy, sort, group)


-- | Find the number that occurs the most times
highestRank :: Ord c => [c] -> c
highestRank = head . maximumBy (comparing length) . group . sort


-- | Join 2 arrays, merge sorting
merge :: (Num a, Ord a) => [a] -> [a] -> [a]
merge [] [] = []
merge xs [] = xs
merge [] xs = xs
merge a@(x:xs) b@(y:ys)
  | x <= y    = x : merge xs b
  | otherwise = y : merge a ys


-- | Impurity is contrained to IO
main :: IO()
main = do
  let xs = [1,34,1,54,1,124,24,123,4,4,1,345,56,26,56,4,4,62,4,534,345,3,53,5]
  print $ highestRank xs
  print $ merge [2, 4, 6, 8] [1, 3, 5, 7]
