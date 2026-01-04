import { TemplateCard } from './TemplateCard';
import { useTemplatesStore } from '@/lib/stores/templates-store';
import { useSettingsStore } from '@/lib/stores/settings-store';
import { Button } from '@/components/ui';
import { ArrowLeft, Layout } from 'lucide-react';
import type { Template } from '@/lib/types';
import toast from 'react-hot-toast';

export function TemplateGrid() {
  const { templates, selectedTemplate, selectTemplate } = useTemplatesStore();
  const { setActiveTab } = useSettingsStore();

  const handleSelect = (template: Template) => {
    if (selectedTemplate?.id === template.id) {
      selectTemplate(null);
      toast.success('Template deseleccionado');
    } else {
      selectTemplate(template);
      toast.success(`Template "${template.name}" seleccionado`);
    }
  };

  const handleUseTemplate = () => {
    if (selectedTemplate) {
      setActiveTab('chat');
      toast.success('Ahora puedes usar el template en el chat');
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
            <Layout className="w-4 h-4 text-accent" />
          </div>
          <div>
            <h2 className="font-semibold text-white">Templates</h2>
            <p className="text-xs text-gray-500">
              {selectedTemplate ? `Seleccionado: ${selectedTemplate.name}` : 'Elige un estilo'}
            </p>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-2 gap-3">
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              isSelected={selectedTemplate?.id === template.id}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>

      {/* Action button */}
      {selectedTemplate && (
        <div className="p-4 border-t border-border">
          <Button
            onClick={handleUseTemplate}
            className="w-full"
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            Usar en Chat
          </Button>
        </div>
      )}
    </div>
  );
}
