# # Open the file in read mode
# file_path = r"C:\Program Files\PostgreSQL\16\bin\data.tsv"

# try:
#     with open(file_path, 'r', encoding='UTF-8') as file:
#         # Read the contents of the file
#         data = file.readlines()
#         # Display the content
#         for line in data:
#             print(line.strip())  # Strip any trailing newline characters
# except FileNotFoundError:
#     print(f"File '{file_path}' not found.")
# except Exception as e:
#     print(f"An error occurred: {str(e)}")


import csv

# Specify the file path
file_path = r'C:\Program Files\PostgreSQL\16\bin\data.tsv'

# Specify the column index (0-based) you want to load
column_index = 2  # Change this to the index of the column you want to load
column_index_original = 3;

# Create an empty list to store the values of the specific column
column_values = []
column_values_original = []
isadult = []
# Open the TSV file and read the specific column
with open(file_path, 'r', newline='', encoding='utf-8') as tsv_file:
    tsv_reader = csv.reader(tsv_file, delimiter='\t')  # Use tab (\t) as the delimiter
    for row in tsv_reader:
        # Check if the row has enough columns
        #if len(row) > column_index:
            # Append the value of the specific column to the list
            column_values.append(row[column_index])
        #if len(row) > column_index_original:
            column_values_original.append(row[column_index_original])
            isadult.append(row[4])
# Print the values of the specific column
# print(column_values[0]);


for i in range(1,49):
    print(isadult[i])