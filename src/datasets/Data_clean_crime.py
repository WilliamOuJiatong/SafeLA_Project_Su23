import pandas as pd

# 读取 CSV 文件
df = pd.read_csv('Crime_Data_from_2020_to_Present.csv')

# 重命名 "Date Rptd" 列为 "Date_Rptd"
df = df.rename(columns={'Date Rptd': 'Date_Rptd'})

# 删除 "DATE OCC" 列
df = df.drop(['DATE OCC'], axis=1)

# 重命名 "TIME OCC" 列为 "TIME_OCC"
df = df.rename(columns={'TIME OCC': 'TIME_OCC'})

# 重命名 "AREA NAME" 列为 "AREA_Name"
df = df.rename(columns={'AREA NAME': 'AREA_Name'})

# 重命名 "Rpt Dist No" 列为 "Rpt_Dist_No"
df = df.rename(columns={'Rpt Dist No': 'Rpt_Dist_No'})

# 删除 "Part 1-2"列
df = df.drop(['Part 1-2'], axis=1)

# 重命名 "Crm Cd" 列为 "Crm_Cd"
df = df.rename(columns={'Crm Cd': 'Crm_Cd'})

# 重命名 "Crm Cd Desc" 列为 "Crm_Cd_Desc"
df = df.rename(columns={'Crm Cd Desc': 'Crm_Cd_Desc'})

# 重命名 "Vict Age" 列为 "Vict_Age"
df = df.rename(columns={'Vict Age': 'Vict_Age'})

# 重命名 "Vict Sex" 列为 "Vict_Sex"
df = df.rename(columns={'Vict Sex': 'Vict_Sex'})

# 重命名 "Vict Descent" 列为 "Vict_Descent"
df = df.rename(columns={'Vict Descent': 'Vict_Descent'})

# 重命名 "Premis Cd" 列为 "Premis_Cd"
df = df.rename(columns={'Premis Cd': 'Premis_Cd'})

# 重命名 "Premis Desc" 列为 "Premis_Desc"
df = df.rename(columns={'Premis Desc': 'Premis_Desc'})

# 重命名 "Weapon Used Cd" 列为 "Weapon_Used_Cd"
df = df.rename(columns={'Weapon Used Cd': 'Weapon_Used_Cd'})

# 重命名 "Weapon Desc" 列为 "Weapon_Desc"
df = df.rename(columns={'Weapon Desc': 'Weapon_Desc'})

# 重命名 "Status" 列为 "Status"
df = df.rename(columns={'Status': 'Status'})

# 重命名 "Status Desc" 列为 "Status_Desc"
df = df.rename(columns={'Status Desc': 'Status_Desc'})

# 重命名 "Crm Cd 1" 列为 "Crm_Cd1"
df = df.rename(columns={'Crm Cd 1': 'Crm_Cd1'})

# 重命名 "Crm Cd 2" 列为 "Crm_Cd2"
df = df.rename(columns={'Crm Cd 2': 'Crm_Cd2'})

# 重命名 "Crm Cd 3" 列为 "Crm_Cd3"
df = df.rename(columns={'Crm Cd 3': 'Crm_Cd3'})

# 重命名 "Crm Cd 4" 列为 "Crm_Cd4"
df = df.rename(columns={'Crm Cd 4': 'Crm_Cd4'})

# 重命名 "LOCATION" 列为 "Location"
df = df.rename(columns={'LOCATION': 'Location'})

# 重命名 "Cross Street" 列为 "Cross_Street"
df = df.rename(columns={'Cross Street': 'Cross_Street'})

# 将 "Date_Rptd" 列每个字符只保留前 10 个字符
df['Date_Rptd'] = df['Date_Rptd'].str[:10]

# # 将MM/DD/YYYY格式的 "Date_Rptd" 列转换为 YYYY-MM-DD 格式
df['Date_Rptd'] = pd.to_datetime(df['Date_Rptd'], format='%m/%d/%Y')

# 检查每一列为空值的数量
print(df.isnull().sum())

# 将数据集保存为新的 CSV 文件并命名为 "Rent_Price_LA_clean.csv"
df.to_csv('Crime_Data_from_2020_to_Present_clean.csv', index=False)

