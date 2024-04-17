steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE teams (
            id INT PRIMARY KEY NOT NULL,
            team_name VARCHAR(15) NOT NULL,
            full_name VARCHAR(50) NOT NULL,
            color VARCHAR(20) NOT NULL,
            alternative_color VARCHAR(20) NOT NULL,
            logo VARCHAR(250) NOT NULL,
            location VARCHAR(50) NOT NULL,
            record VARCHAR(8) NOT NULL,
            standing VARCHAR(50) NOT NULL
        );



        """,

        # "Down" SQL statement
        """
        DROP TABLE teams;
        """

    ]
]
