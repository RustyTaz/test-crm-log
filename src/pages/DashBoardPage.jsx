import React from "react";
import { Menu } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import {
	HomeOutlined,
	CalendarOutlined,
	ProjectOutlined,
	ContactsOutlined,
	LogoutOutlined,
} from "@ant-design/icons";

export default function DashBoardPage() {
	const navigate = useNavigate();
	return (
		<div style={{ display: "flex", flexDirection: "row" }}>
			<div style={{ marginTop: 20, marginLeft: 20 }}>
				<Menu
					onClick={({ key }) => navigate(key)}
					items={[
						{ label: "Home", key: "home", icon: <HomeOutlined /> },
						{
							label: "Total Contacts",
							key: "contacts",
							icon: <ContactsOutlined />,
						},
						{
							label: "Calendar",
							key: "calendar",
							icon: <CalendarOutlined />,
						},
						{
							label: "Project Report",
							key: "proj-report",
							icon: <ProjectOutlined />,
						},
						{
							label: "Log out",
							key: "../login",
							icon: <LogoutOutlined />,
							danger: true,
						},
					]}
				></Menu>
			</div>

			<Outlet />
		</div>
	);
}
