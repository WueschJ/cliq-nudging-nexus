
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PriorityNudging from "./PriorityNudging";
import NewNominees from "./NewNominees";
import LongTimeNoInteraction from "./LongTimeNoInteraction";
import PotentialF2Ps from "./PotentialF2Ps";

const Dashboard = () => {
  const [nudgeCount, setNudgeCount] = useState(0);
  const [priorityPeople, setPriorityPeople] = useState([
    { id: "p1", name: "John Smith", status: "pending" },
    { id: "p2", name: "Sarah Johnson", status: "pending" },
    { id: "p3", name: "Michael Brown", status: "pending" },
    { id: "p4", name: "Emily Davis", status: "pending" },
  ]);

  const [nominees, setNominees] = useState([
    { id: "n1", name: "Alex Wilson" },
    { id: "n2", name: "Olivia Martinez" },
    { id: "n3", name: "Daniel Lee" },
  ]);

  const [longTimeNoInteraction, setLongTimeNoInteraction] = useState([
    { id: "l1", name: "Robert Taylor", lastInteractionDate: "2025-02-15" },
    { id: "l2", name: "Jennifer Anderson", lastInteractionDate: "2025-01-10" },
    { id: "l3", name: "William Clark", lastInteractionDate: "2024-12-22" },
  ]);

  const [potentialF2Ps, setPotentialF2Ps] = useState([
    { id: "f1", name: "Lisa Garcia", favor: "Help with presentation", status: "pending" },
    { id: "f2", name: "Kevin Wright", favor: "Intro to marketing team", status: "pending" },
    { id: "f3", name: "Amanda Rodriguez", favor: "Review product proposal", status: "pending" },
  ]);

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

  const handleAcceptLongTime = (id: string) => {
    const person = longTimeNoInteraction.find((p) => p.id === id);
    if (person) {
      // Add to priority list
      setPriorityPeople([
        ...priorityPeople,
        { id: `p${Date.now()}`, name: person.name, status: "pending" },
      ]);
      
      // Remove from long time no interaction
      setLongTimeNoInteraction(longTimeNoInteraction.filter((p) => p.id !== id));
    }
  };

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
      <h1 className="text-3xl font-bold mb-6 text-center">Cliq Operations</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-md">
          <CardHeader className="bg-gray-50 border-b">
            <div className="flex justify-between items-center">
              <CardTitle>Priority Nudging Log</CardTitle>
              <div className="bg-blue-600 text-white py-1 px-3 rounded-full text-sm">
                Nudged: {nudgeCount}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <PriorityNudging people={priorityPeople} onAction={handlePriorityAction} />
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardHeader className="bg-gray-50 border-b">
            <CardTitle>New Nominees</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <NewNominees nominees={nominees} onAccept={handleAcceptNominee} />
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardHeader className="bg-gray-50 border-b">
            <CardTitle>Long Time No Interaction</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <LongTimeNoInteraction 
              people={longTimeNoInteraction} 
              onAccept={handleAcceptLongTime} 
            />
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardHeader className="bg-gray-50 border-b">
            <CardTitle>Potential F2Ps</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <PotentialF2Ps f2ps={potentialF2Ps} onAction={handleF2PAction} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
