"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

interface UserData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userType: string;
  createdAt: string;
}

export default function ManageUsersPage() {
  const { user, loading: authLoading, userType: currentUserType } = useAuth();
  const [users, setUsers] = useState<UserData[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [selectedUserType, setSelectedUserType] = useState<string>("");

  const fetchUsers = async () => {
    if (!user || currentUserType !== "admin") return; // Ensure admin is logged in

    setLoadingUsers(true);
    setError(null);
    try {
      const idToken = await user.getIdToken();
      const response = await fetch("/api/admin/users", {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to fetch users.");
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("An unexpected error occurred while fetching users.");
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    if (!authLoading && user && currentUserType === "admin") {
      fetchUsers();
    }
  }, [user, authLoading, currentUserType]);

  const handleEditUserType = (userId: string, currentType: string) => {
    setEditingUserId(userId);
    setSelectedUserType(currentType);
  };

  const handleSaveUserType = async (userId: string) => {
    if (!user || currentUserType !== "admin") {
      setError("Unauthorized action.");
      return;
    }

    setLoadingUsers(true); // Show loading while saving
    setError(null);
    try {
      const idToken = await user.getIdToken();
      const response = await fetch("/api/admin/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          userId,
          userType: selectedUserType,
        }),
      });

      if (response.ok) {
        setEditingUserId(null);
        fetchUsers(); // Re-fetch users to update the list
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to update user type.");
      }
    } catch (err) {
      console.error("Error updating user type:", err);
      setError("An unexpected error occurred while updating user type.");
    } finally {
      setLoadingUsers(false);
    }
  };

  if (authLoading || loadingUsers) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <p className="ml-2">Loading users...</p>
      </div>
    );
  }

  if (!user || currentUserType !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Access Denied: You do not have administrative privileges.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Manage Users</CardTitle>
          <p className="text-gray-600">View and update user roles.</p>
        </CardHeader>
        <CardContent>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>User Type</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>{u.firstName} {u.lastName}</TableCell>
                  <TableCell>
                    {editingUserId === u.id ? (
                      <Select value={selectedUserType} onValueChange={setSelectedUserType}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select a type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="patient">Patient</SelectItem>
                          <SelectItem value="counselor">Counselor</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      u.userType
                    )}
                  </TableCell>
                  <TableCell>
                    {editingUserId === u.id ? (
                      <div className="flex space-x-2">
                        <Button size="sm" onClick={() => handleSaveUserType(u.id)}>
                          Save
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setEditingUserId(null)}>
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <Button size="sm" onClick={() => handleEditUserType(u.id, u.userType)}>
                        Edit Role
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {users.length === 0 && !loadingUsers && !error && (
            <p className="text-center text-gray-500 mt-4">No users found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
