import React, { useState, useRef } from "react";
import { Button, Table, Input, Space } from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import { SearchOutlined } from "@ant-design/icons";
import type { InputRef } from "antd";
// Пришлось подключить TS чтобы можно было заюзать таблицу с Ant Design
// Понимаю что компонент вышел очень толстым но думаю он все еще читабельный как минимум данные можно отсюда вынести
// Таблицу и навбар тоже можно сделать UI компонентами собсвенной библиотеки. Также функуции поиска и сортировки можно сделать свои собсвенные
interface DataType {
	key: number;
	name: string;
	trn: number;
	yearEnd: string;
	ard: string;
	companyNumber: string;
	email: string;
	phoneNumber: string;
	address: string;
}
type DataIndex = keyof DataType;

const data: DataType[] = [];
for (let i = 0; i < 46; i++) {
	data.push({
		key: i,
		name: `Edward King ${i}`,
		trn: i,
		yearEnd: "23/06/22", // эти поля можно сделать в виде даты а не строки 
		ard: "23/06/2022",
		companyNumber: "123456789",
		email: "email1234@gmail.com",
		phoneNumber: "7897353123",
		address: `London, Park Lane no. ${i}`,
	});
}
export default function ClientsTable() {
	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
	const [loading, setLoading] = useState(false);

	const [searchText, setSearchText] = useState("");
	const [searchedColumn, setSearchedColumn] = useState("");
	const searchInput = useRef<InputRef>(null);

	const handleSearch = (
		selectedKeys: string[],
		confirm: (param?: FilterConfirmProps) => void,
		dataIndex: DataIndex
	) => {
		confirm();
		setSearchText(selectedKeys[0]);
		setSearchedColumn(dataIndex);
	};

	const handleReset = (clearFilters: () => void) => {
		clearFilters();
		setSearchText("");
	};

	const getColumnSearchProps = (
		dataIndex: DataIndex
	): ColumnType<DataType> => ({
		filterDropdown: ({
			setSelectedKeys,
			selectedKeys,
			confirm,
			clearFilters,
			close,
		}) => (
			<div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
				<Input
					ref={searchInput}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={(e) =>
						setSelectedKeys(e.target.value ? [e.target.value] : [])
					}
					onPressEnter={() =>
						handleSearch(
							selectedKeys as string[],
							confirm,
							dataIndex
						)
					}
					style={{ marginBottom: 8, display: "block" }}
				/>
				<Space>
					<Button
						type="primary"
						onClick={() =>
							handleSearch(
								selectedKeys as string[],
								confirm,
								dataIndex
							)
						}
						icon={<SearchOutlined />}
						size="small"
						style={{ width: 90 }}
					>
						Search
					</Button>
					<Button
						onClick={() => {
							clearFilters && handleReset(clearFilters);
							handleSearch(
								selectedKeys as string[],
								confirm,
								dataIndex
							);
						}}
						size="small"
						style={{ width: 90 }}
					>
						Reset
					</Button>
					<Button
						type="link"
						size="small"
						onClick={() => {
							close();
						}}
					>
						close
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered: boolean) => (
			<SearchOutlined
				style={{ color: filtered ? "#1890ff" : undefined }}
			/>
		),
		onFilter: (value, record) =>
			record[dataIndex]
				.toString()
				.toLowerCase()
				.includes((value as string).toLowerCase()),
		onFilterDropdownOpenChange: (visible) => {
			if (visible) {
				setTimeout(() => searchInput.current?.select(), 100);
			}
		},
	});

	const start = () => {
		setLoading(true);
		setTimeout(() => {
			setSelectedRowKeys([]);
			setLoading(false);
		}, 1000);
	};

	const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
		console.log("selectedRowKeys changed: ", newSelectedRowKeys);
		setSelectedRowKeys(newSelectedRowKeys);
	};

	const rowSelection = {
		selectedRowKeys,
		onChange: onSelectChange,
	};
	const hasSelected = selectedRowKeys.length > 0;

	const columns: ColumnsType<DataType> = [
		{
			title: "Client ID",
			dataIndex: "key",
			defaultSortOrder: "ascend",
			sorter: (a, b) => a.key - b.key,
		},
		{
			title: "Name",
			dataIndex: "name",
			defaultSortOrder: "ascend",
			...getColumnSearchProps("name"),
		},
		{
			title: "TRN",
			dataIndex: "trn",
		},
		{
			title: "Year end",
			dataIndex: "yearEnd",
		},
		{
			title: "ARD",
			dataIndex: "ard",
		},
		{
			title: "Company number",
			dataIndex: "companyNumber",
		},
		{
			title: "Email",
			dataIndex: "email",
		},
		{
			title: "Phone number",
			dataIndex: "phoneNumber",
		},
		{
			title: "Address",
			dataIndex: "address",
		},
	];

	return (
		<div>
			<div style={{ marginTop: 20, marginLeft: 20 }}>
				<Button
					type="primary"
					onClick={start}
					disabled={!hasSelected}
					loading={loading}
				>
					Do with selected
				</Button>
				<span style={{ marginLeft: 8 }}>
					{hasSelected
						? `Selected ${selectedRowKeys.length} items`
						: ""}
				</span>
			</div>
			<div style={{ marginTop: 20, marginLeft: 20 }}>
				<Table
					rowSelection={rowSelection}
					columns={columns}
					dataSource={data}
				/>
			</div>
		</div>
	);
}
