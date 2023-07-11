import pandas as pd

# 读取 CSV 文件
df = pd.read_csv('Rent_Price__LA_.csv')
df['LAT'], df['LON'] = df['Location'].str.extract(r'\((.*), (.*)\)').values.T

# 将新生成的 "LAT" 和 "LON" 列转换为 float 类型
df['LAT'] = df['LAT'].astype(float)
df['LON'] = df['LON'].astype(float)

# 删除 "Location, Policy Area,Dataset,Variable" 列
df = df.drop(['Location', 'Policy Area', 'Dataset', 'Variable'], axis=1)

# 重命名 "Tract Number" 列为 "Tract_Number"
df = df.rename(columns={'Tract Number': 'Tract_Number'})

# 重命名 "Row IDr" 列为 "Row_ID"
df = df.rename(columns={'Row ID': 'Row_ID'})

# 检查每一列为空值的数量
print(df.isnull().sum())

# 将MM/DD/YYYY格式的 "DATA" 列转换为 YYYY-MM-DD 格式
df['Date'] = pd.to_datetime(df['Date'], format='%m/%d/%Y')

# 查看前 5 行数据
print(df.head())

# 将数据集保存为新的 CSV 文件并命名为 "Rent_Price_LA_clean.csv"
df.to_csv('Rent_Price_LA_clean.csv', index=False)
