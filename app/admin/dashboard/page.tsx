"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Users,
  UserCheck,
  Calendar,
  TrendingUp,
  Heart,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Download,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Loader2,
} from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/components/auth-provider";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

interface UserData {
  id: string; // Explicitly defined once
  email: string;
  userType: "patient" | "counselor" | "admin";
  status: "active" | "inactive" | "suspended";
  createdAt: string;
  lastLogin?: string;
  sessionsCount?: number;
  avatar?: string;
  firstName: string;
  lastName: string;
}

interface ProfessionalData {
  id: string;
  firstName: string;
  lastName: string;
  title: string;
  specialties: string[];
  status: "pending" | "approved" | "rejected" | "suspended";
  rating: number;
  reviews: number;
  sessionsCompleted: number;
  createdAt: string;
  image?: string;
}

interface SessionData {
  id: string;
  patientId: string;
  counselorId: string;
  date: string;
  duration: number;
  status: "scheduled" | "completed" | "cancelled" | "no-show";
  type: "video" | "audio" | "chat";
  amount: number;
}

export default function AdminDashboard() {
  const { user, loading: authLoading, userType: currentUserType } = useAuth();
  const [users, setUsers] = useState<UserData[]>([]);
  const [professionals, setProfessionals] = useState<ProfessionalData[]>([]);
  const [sessions, setSessions] = useState<SessionData[]>([]);

  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  const fetchAllData = async () => {
    if (!user || currentUserType !== "admin") {
      setLoadingData(false);
      setError("Access Denied: Not an admin.");
      return;
    }

    setLoadingData(true);
    setError(null);
    try {
      // Fetch Users
      const usersSnapshot = await getDocs(collection(db, "users"));
      const usersList: UserData[] = usersSnapshot.docs.map((doc) => ({
        ...(doc.data() as Omit<UserData, 'id'>), // Spread the rest of the data, omitting 'id' if it somehow exists there
        id: doc.id, // Explicitly get the document ID
      }));
      setUsers(usersList);

      // Fetch Professionals
      const professionalsSnapshot = await getDocs(collection(db, "professionals"));
      const professionalsList: ProfessionalData[] = professionalsSnapshot.docs.map((doc) => ({
        ...(doc.data() as ProfessionalData),
        id: doc.id,
      }));
      setProfessionals(professionalsList);

      // Fetch Sessions (assuming a 'sessions' collection exists)
      const sessionsSnapshot = await getDocs(collection(db, "sessions"));
      const sessionsList: SessionData[] = sessionsSnapshot.docs.map((doc) => ({
        ...(doc.data() as SessionData),
        id: doc.id,
      }));
      setSessions(sessionsList);

    } catch (err: any) {
      console.error("Error fetching dashboard data:", err);
      setError(`Failed to load dashboard data: ${err.message || err}`);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (!authLoading && user && currentUserType === "admin") {
      fetchAllData();
    }
  }, [user, authLoading, currentUserType]);

  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.status === "active").length;
  const totalProfessionals = professionals.length;
  const pendingApprovals = professionals.filter((p) => p.status === "pending").length;
  const totalSessions = sessions.length;
  const completedSessions = sessions.filter((s) => s.status === "completed").length;
  const totalRevenue = sessions.filter((s) => s.status === "completed").reduce((sum, s) => sum + s.amount, 0);

  const handleUserStatusChange = async (userId: string, newStatus: "active" | "inactive" | "suspended") => {
    if (!user || currentUserType !== "admin") return;
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, { status: newStatus });
      setUsers(users.map((u) => (u.id === userId ? { ...u, status: newStatus } : u)));
    } catch (err: any) {
      console.error("Error updating user status:", err);
      setError("Failed to update user status.");
    }
  };

  const handleProfessionalStatusChange = async (professionalId: string, newStatus: "approved" | "rejected" | "suspended") => {
    if (!user || currentUserType !== "admin") return;
    try {
      const professionalRef = doc(db, "professionals", professionalId);
      await updateDoc(professionalRef, { status: newStatus });
      setProfessionals(professionals.map((p) => (p.id === professionalId ? { ...p, status: newStatus } : p)));
    } catch (err: any) {
      console.error("Error updating professional status:", err);
      setError("Failed to update professional status.");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "inactive":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "suspended":
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "counselor":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "patient":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (authLoading || loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <p className="ml-2">Loading dashboard data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        <p>{error}</p>
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

  if (authLoading || loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <p className="ml-2">Loading dashboard data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        <p>{error}</p>
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

  if (!user || currentUserType !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Access Denied: You do not have administrative privileges.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage your mental health platform</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" className="bg-transparent">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
              <Link href="/admin/add-professional">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Professional
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium opacity-90">Total Users</CardTitle>
                <Users className="h-5 w-5 opacity-80" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">{totalUsers}</div>
              <p className="text-sm opacity-80">{activeUsers} active users</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium opacity-90">Professionals</CardTitle>
                <UserCheck className="h-5 w-5 opacity-80" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">{totalProfessionals}</div>
              <p className="text-sm opacity-80">{pendingApprovals} pending approval</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium opacity-90">Sessions</CardTitle>
                <Calendar className="h-5 w-5 opacity-80" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">{completedSessions}</div>
              <p className="text-sm opacity-80">completed this month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium opacity-90">Revenue</CardTitle>
                <DollarSign className="h-5 w-5 opacity-80" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">${totalRevenue.toLocaleString()}</div>
              <p className="text-sm opacity-80">this month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="professionals">Professionals</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-blue-600" />
                      <span>User Management</span>
                    </CardTitle>
                    <CardDescription>Manage user accounts and permissions</CardDescription>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Select value={selectedRole} onValueChange={setSelectedRole}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="patient">Patients</SelectItem>
                        <SelectItem value="counselor">Counselors</SelectItem>
                        <SelectItem value="admin">Admins</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.filter((u) => {
                    const matchesSearch =
                      u.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      u.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      u.email.toLowerCase().includes(searchTerm.toLowerCase());
                    const matchesRole = selectedRole === "all" || u.userType === selectedRole;
                    const matchesStatus = selectedStatus === "all" || u.status === selectedStatus;
                    return matchesSearch && matchesRole && matchesStatus;
                  }).map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={`${user.firstName} ${user.lastName}`} />
                          <AvatarFallback>
                            {user.firstName[0]}{user.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-gray-900">{user.firstName} {user.lastName}</h3>
                            <Badge className={getRoleColor(user.userType)}>{user.userType}</Badge>
                            <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                          </div>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                            <span>Joined: {new Date(user.createdAt).toLocaleDateString()}</span>
                            {user.lastLogin && <span>Last login: {new Date(user.lastLogin).toLocaleDateString()}</span>}
                            <span>{user.sessionsCount} sessions</span>
                          </div>
                        </div>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {user.status === "active" ? (
                            <DropdownMenuItem
                              onClick={() => handleUserStatusChange(user.id, "suspended")}
                              className="text-red-600"
                            >
                              <AlertTriangle className="h-4 w-4 mr-2" />
                              Suspend User
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              onClick={() => handleUserStatusChange(user.id, "active")}
                              className="text-green-600"
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Activate User
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Professionals Tab */}
          <TabsContent value="professionals" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <UserCheck className="h-5 w-5 text-green-600" />
                      <span>Professional Management</span>
                    </CardTitle>
                    <CardDescription>Review and manage mental health professionals</CardDescription>
                  </div>
                  <Link href="/admin/add-professional">
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Professional
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {professionals.map((professional) => (
                    <div
                      key={professional.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={professional.image || "/placeholder.svg"} alt={`${professional.firstName} ${professional.lastName}`} />
                          <AvatarFallback>
                            {professional.firstName && professional.lastName
                              ? `${professional.firstName[0]}${professional.lastName[0]}`
                              : ""}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-gray-900">{`${professional.firstName} ${professional.lastName}`}</h3>
                            <Badge className={getStatusColor(professional.status)}>{professional.status}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{professional.title}</p>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {professional.specialties.map((specialty) => (
                              <Badge key={specialty} variant="outline" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>
                              ⭐ {professional.rating} ({professional.reviews} reviews)
                            </span>
                            <span>{professional.sessionsCompleted} sessions</span>
                            <span>Applied: {new Date(professional.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        {professional.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleProfessionalStatusChange(professional.id, "approved")}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleProfessionalStatusChange(professional.id, "rejected")}
                              className="text-red-600 border-red-600 hover:bg-red-50"
                            >
                              <AlertTriangle className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </>
                        )}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <Link href={`/professionals/${professional.id}`}>
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Profile
                            </DropdownMenuItem>
                            </Link>
                            <Link href={`/admin/edit-professional/${professional.id}`}>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Details
                            </DropdownMenuItem>
                            </Link>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Remove
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sessions Tab */}
          <TabsContent value="sessions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-purple-600" />
                  <span>Session Management</span>
                </CardTitle>
                <CardDescription>Monitor and manage therapy sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <Calendar className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2">No sessions to display</p>
                  <p>Session data will appear here once users start booking appointments.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    <span>Platform Analytics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium">User Growth Rate</span>
                      <span className="text-blue-600 font-bold">+-12%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="font-medium">Session Completion Rate</span>
                      <span className="text-green-600 font-bold">94%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span className="font-medium">Average Session Rating</span>
                      <span className="text-purple-600 font-bold">4.8/5</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Heart className="h-5 w-5 text-red-600" />
                    <span>Wellness Metrics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <span className="font-medium">Daily Mood Entries</span>
                      <span className="text-red-600 font-bold">1,247</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                      <span className="font-medium">Assessments Completed</span>
                      <span className="text-orange-600 font-bold">89</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-teal-50 rounded-lg">
                      <span className="font-medium">Crisis Interventions</span>
                      <span className="text-teal-600 font-bold">3</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}