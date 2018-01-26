-- problem 1 find the earliest date the user joined
SELECT DATE_FORMAT(
    (SELECT created_at FROM users ORDER BY created_at LIMIT 1), 
    '%M %D %Y') AS earliest_date;
    
-- problem 2 find the email of earliest user

SELECT email, created_at FROM users WHERE 
created_at = (SELECT created_at from users ORDER BY created_at limit 1);

-- problem 3 find count of users joined in various months

SELECT DATE_FORMAT(created_at, '%M') AS month, COUNT(*) AS count
FROM users GROUP BY month ORDER BY count DESC;

-- problem 4 find count of users with yahoo email

SELECT count(email) AS yahoo_users FROM users WHERE email LIKE '%yahoo%'; 

-- problem 5 find count of users with each email address

SELECT 
    CASE
        WHEN email LIKE '%yahoo%' THEN 'yahoo'
        WHEN email LIKE '%gmail%' THEN 'gmail'
        WHEN email LIKE '%hotmail%' THEN 'hotmail'
        ELSE 'other'
    END AS provider,
    COUNT(*) AS count
FROM users
GROUP BY provider;
