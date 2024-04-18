steps = [
    [
        # "Up" SQL statement
        """
        ALTER TABLE users
        ADD first_name VARCHAR(50) NOT NULL,
        ADD last_name VARCHAR(50) NOT NULL,
        ADD address VARCHAR(200) NOT NULL,
        ADD birthday DATE NOT NULL,
        ADD favorite_team_id INTEGER NOT NULL
        ;
        """,
        # "Down" SQL statement
        """
        DROP COLUMN first_name, last_name, address, birthday,
        favorite_team_id;
        """,
    ],
]
