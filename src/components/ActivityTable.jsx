import { Table, TableHead, TableBody, TableRow, TableCell, Button, Paper } from "@mui/material";

const ActivityTable = ({ activitiesForDate, date, handleOpen, deleteActivity }) => {
    return (
        <div key={date} style={{ width: "80%", marginBottom: "20px" }}>
            {/* Date Header */}
            <h3 style={{ padding: "10px", borderRadius: "5px", textAlign: "left" }}>
                {date}
            </h3>

            {/* Table */}
            <Paper elevation={3} sx={{ borderRadius: "10px", overflow: "hidden" }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#b7e1cd" }}>
                            <TableCell sx={{ fontWeight: "bold" }}>Time</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Activity</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Notes</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {activitiesForDate.map((activity) => {
                            const time = new Date(activity.created_at).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            });

                            return (
                                <TableRow key={activity.id} hover>
                                    <TableCell
                                        sx={{ cursor: "pointer" }}
                                        onClick={() => handleOpen(activity.name, activity)}
                                    >
                                        {time}
                                    </TableCell>
                                    <TableCell
                                        sx={{ cursor: "pointer" }}
                                        onClick={() => handleOpen(activity.name, activity)}
                                    >
                                        {activity.name}
                                    </TableCell>
                                    <TableCell
                                        sx={{ cursor: "pointer" }}
                                        onClick={() => handleOpen(activity.name, activity)}
                                    >
                                        {activity.notes?.replace(/poop/gi, "💩").replace(/pee/gi, "🚽") || "—"}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            color="error"
                                            size="large"
                                            onClick={() => deleteActivity(activity.id)}
                                        >
                                            🚮
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    );
};

export default ActivityTable;