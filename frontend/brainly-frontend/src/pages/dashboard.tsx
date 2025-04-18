import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Sidebar } from "../components/Sidebar";
import { useContent } from "../hooks/useContent";
import { BACKEND_URL } from "../config";
import axios from "axios";

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const { contents, refresh } = useContent();

  useEffect(() => {
    if (!modalOpen) {
      refresh(); // Refresh after modal closes
    }
  }, [modalOpen]);

  const shareBrain = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/brain/share`,
        { share: true },
        {
          headers: {
            Authorization: localStorage.getItem("token") || "",
          },
        }
      );

      const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
      alert(`Share this link: ${shareUrl}`);
    } catch (error) {
      console.error("Error sharing brain:", error);
      alert("Failed to generate share link.");
    }
  };

  return (
    <div>
      <Sidebar />


     
      <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2">
      <CreateContentModal 
  open={modalOpen} 
  onClose={() => setModalOpen(false)}
  onContentCreated={() => {
    refresh();           // 🔁 Fetch updated content
    setModalOpen(false); // ❌ Close modal
  }}
/>
<div className="flex justify-between items-center">
<div className="text-3xl font-bold p-12 mb-6">All Notes
</div>

        <div className="flex justify-end gap-4 mb-4">
          <Button
            onClick={() => setModalOpen(true)}
            variant="primary"
            text="Add content"
            startIcon={<PlusIcon />}
          />
          <Button
            onClick={shareBrain}
            variant="secondary"
            text="Share brain"
            startIcon={<ShareIcon />}
          />
        </div>
       </div>
        {Array.isArray(contents) && contents.length === 0 ? (
  <p className="text-gray-500">No content found. Add some to get started!</p>
) : (
  <div className="flex gap-4 flex-wrap">
    {Array.isArray(contents) && contents.map(({ _id, type, link, title }) => (
      <Card key={_id} type={type} link={link} title={title} />
    ))}
  </div>
)}

      </div>
    </div>
  );
}
