import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PriorityNudging from "./PriorityNudging";
import NewNominees from "./NewNominees";
import LongTimeNoInteraction from "./LongTimeNoInteraction";
import PotentialF2Ps from "./PotentialF2Ps";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Type definitions to fix TS errors
interface Person {
  id: string;
  name: string;
  status: "pending" | "accepted" | "rejected" | "nudged";
}

interface Nominee {
  id: string;
  name: string;
  nominatedBy?: string;
  nominationDate?: string;
}

interface LongTimePerson {
  id: string;
  name: string;
  lastInteractionDate: string;
  status?: "pending" | "accepted" | "rejected";
}

interface F2P {
  id: string;
  name: string;
  favor: string;
  status: "pending" | "accepted" | "rejected" | "done";
}

const Dashboard = () => {
  const [nudgeCount, setNudgeCount] = useState(0);
  const [priorityPeople, setPriorityPeople] = useState<Person[]>([
    { id: "p1", name: "John Smith", status: "pending" },
    { id: "p2", name: "Sarah Johnson", status: "pending" },
    { id: "p3", name: "Michael Brown", status: "pending" },
    { id: "p4", name: "Emily Davis", status: "pending" },
  ]);

  const [nominees, setNominees] = useState<Nominee[]>([
    { 
      id: "n1", 
      name: "Alex Wilson", 
      nominatedBy: "Jane Cooper", 
      nominationDate: "2025-04-28" 
    },
    { 
      id: "n2", 
      name: "Olivia Martinez", 
      nominatedBy: "Robert Lee", 
      nominationDate: "2025-05-01" 
    },
    { 
      id: "n3", 
      name: "Daniel Lee", 
      nominatedBy: "Maria Rodriguez", 
      nominationDate: "2025-05-10" 
    },
  ]);

  const [longTimeNoInteraction, setLongTimeNoInteraction] = useState<LongTimePerson[]>([
    { id: "l1", name: "Robert Taylor", lastInteractionDate: "2025-02-15", status: "pending" },
    { id: "l2", name: "Jennifer Anderson", lastInteractionDate: "2025-01-10", status: "pending" },
    { id: "l3", name: "William Clark", lastInteractionDate: "2024-12-22", status: "pending" },
  ]);

  const [potentialF2Ps, setPotentialF2Ps] = useState<F2P[]>([
    { id: "f1", name: "Lisa Garcia", favor: "Help with presentation", status: "pending" },
    { id: "f2", name: "Kevin Wright", favor: "Intro to marketing team", status: "pending" },
    { id: "f3", name: "Amanda Rodriguez", favor: "Review product proposal", status: "pending" },
  ]);

  // Priority actions
  const handlePriorityAction = (id: string, action: "accept" | "reject" | "nudged") => {
    if (action === "accept") {
      setPriorityPeople(
        priorityPeople.map((person) =>
          person.id === id ? { ...person, status: "accepted" } : person
        )
      );
    } else if (action === "reject") {
      // Mark as rejected, will be filtered out after animation
      setPriorityPeople(
        priorityPeople.map((person) =>
          person.id === id ? { ...person, status: "rejected" } : person
        )
      );
      
      // Remove after a delay for animation
      setTimeout(() => {
        setPriorityPeople((prevPeople) => 
          prevPeople.filter((person) => person.id !== id)
        );
      }, 500);
    } else if (action === "nudged") {
      setNudgeCount((prev) => prev + 1);
      
      // Mark as nudged, will be filtered out after animation
      setPriorityPeople(
        priorityPeople.map((person) =>
          person.id === id ? { ...person, status: "nudged" } : person
        )
      );
      
      // Remove after a delay for animation
      setTimeout(() => {
        setPriorityPeople((prevPeople) => 
          prevPeople.filter((person) => person.id !== id)
        );
      }, 500);
    }
  };

  // Accept nominee
  const handleAcceptNominee = (id: string) => {
    const nominee = nominees.find((n) => n.id === id);
    if (nominee) {
      // Add to priority list
      setPriorityPeople([
        ...priorityPeople,
        { id: `p${Date.now()}`, name: nominee.name, status: "pending" },
      ]);
      
      // Remove from nominees
      setNominees(nominees.filter((n) => n.id !== id));
    }
  };

  // Long time no interaction actions
  const handleAcceptLongTime = (id: string) => {
    const person = longTimeNoInteraction.find((p) => p.id === id);
    if (person) {
      // Add to priority list
      setPriorityPeople([
        ...priorityPeople,
        { id: `p${Date.now()}`, name: person.name, status: "pending" },
      ]);
      
      // Mark as accepted in the long time list
      setLongTimeNoInteraction(
        longTimeNoInteraction.map((p) =>
          p.id === id ? { ...p, status: "accepted" } : p
        )
      );
      
      // Remove after a delay for animation
      setTimeout(() => {
        setLongTimeNoInteraction((prevPeople) => 
          prevPeople.filter((p) => p.id !== id)
        );
      }, 500);
    }
  };

  const handleRejectLongTime = (id: string) => {
    // Mark as rejected for animation
    setLongTimeNoInteraction(
      longTimeNoInteraction.map((person) =>
        person.id === id ? { ...person, status: "rejected" } : person
      )
    );
    
    // Remove after a delay for animation
    setTimeout(() => {
      setLongTimeNoInteraction((prevPeople) => 
        prevPeople.filter((person) => person.id !== id)
      );
    }, 500);
  };

  // F2P actions
  const handleF2PAction = (id: string, action: "accept" | "reject" | "done") => {
    if (action === "accept") {
      setPotentialF2Ps(
        potentialF2Ps.map((person) =>
          person.id === id ? { ...person, status: "accepted" } : person
        )
      );
    } else if (action === "reject") {
      // Mark as rejected, will be filtered out after animation
      setPotentialF2Ps(
        potentialF2Ps.map((person) =>
          person.id === id ? { ...person, status: "rejected" } : person
        )
      );
      
      // Remove after a delay for animation
      setTimeout(() => {
        setPotentialF2Ps((prevF2Ps) => 
          prevF2Ps.filter((person) => person.id !== id)
        );
      }, 500);
    } else if (action === "done") {
      // Mark as done, will be filtered out after animation
      setPotentialF2Ps(
        potentialF2Ps.map((person) =>
          person.id === id ? { ...person, status: "done" } : person
        )
      );
      
      // Remove after a delay for animation
      setTimeout(() => {
        setPotentialF2Ps((prevF2Ps) => 
          prevF2Ps.filter((person) => person.id !== id)
        );
      }, 500);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Cliq Operations</h1>
        <Button variant="outline" asChild>
          <Link to="/project-operations">Switch to Project Operations</Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-md">
          <CardHeader className="bg-gray-50 border-b py-4">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Priority Nudging Log</CardTitle>
              <div className="bg-blue-600 text-white py-1 px-3 rounded-full text-xs">
                Nudged: {nudgeCount}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-3">
            <PriorityNudging people={priorityPeople} onAction={handlePriorityAction} />
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardHeader className="bg-gray-50 border-b py-4">
            <CardTitle className="text-lg">New Nominees</CardTitle>
          </CardHeader>
          <CardContent className="p-3">
            <NewNominees nominees={nominees} onAccept={handleAcceptNominee} />
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardHeader className="bg-gray-50 border-b py-4">
            <CardTitle className="text-lg">Long Time No Interaction</CardTitle>
          </CardHeader>
          <CardContent className="p-3">
            <LongTimeNoInteraction 
              people={longTimeNoInteraction} 
              onAccept={handleAcceptLongTime}
              onReject={handleRejectLongTime}
            />
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardHeader className="bg-gray-50 border-b py-4">
            <CardTitle className="text-lg">Potential F2Ps</CardTitle>
          </CardHeader>
          <CardContent className="p-3">
            <PotentialF2Ps f2ps={potentialF2Ps} onAction={handleF2PAction} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
