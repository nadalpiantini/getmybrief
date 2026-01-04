import { useState } from 'react';
import { Input, Button, Card } from '@/components/ui';
import { useSettingsStore } from '@/lib/stores/settings-store';
import { validateApiKey } from '@/lib/api/deepseek';
import { Settings, Key, FolderOpen, Check, X, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';

export function SettingsPanel() {
  const {
    deepseekApiKey,
    driveFolderId,
    isGoogleConnected,
    setApiKey,
    setDriveFolderId,
  } = useSettingsStore();

  const [apiKeyInput, setApiKeyInput] = useState(deepseekApiKey);
  const [folderIdInput, setFolderIdInput] = useState(driveFolderId);
  const [isValidating, setIsValidating] = useState(false);
  const [isApiKeyValid, setIsApiKeyValid] = useState<boolean | null>(null);

  const handleValidateApiKey = async () => {
    if (!apiKeyInput.trim()) {
      toast.error('Ingresa una API key');
      return;
    }

    setIsValidating(true);
    try {
      const isValid = await validateApiKey(apiKeyInput);
      setIsApiKeyValid(isValid);

      if (isValid) {
        setApiKey(apiKeyInput);
        toast.success('API key valida y guardada');
      } else {
        toast.error('API key invalida');
      }
    } catch (error) {
      setIsApiKeyValid(false);
      toast.error('Error al validar API key');
    } finally {
      setIsValidating(false);
    }
  };

  const handleSaveFolderId = () => {
    if (folderIdInput.trim()) {
      setDriveFolderId(folderIdInput);
      toast.success('Folder ID guardado');
    }
  };

  const handleConnectGoogle = async () => {
    // Chrome identity API for OAuth
    try {
      if (typeof chrome !== 'undefined' && chrome.identity) {
        chrome.identity.getAuthToken({ interactive: true }, (result) => {
          if (chrome.runtime.lastError) {
            toast.error('Error al conectar con Google');
            console.error(chrome.runtime.lastError);
            return;
          }
          // Handle both old string format and new object format
          const token = typeof result === 'string' ? result : result?.token;
          if (token) {
            useSettingsStore.getState().setGoogleTokens(token);
            toast.success('Conectado con Google Drive');
          }
        });
      } else {
        toast.error('Chrome identity API no disponible. Carga la extension en Chrome.');
      }
    } catch (error) {
      toast.error('Error al conectar con Google');
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
        <div className="w-8 h-8 bg-gray-500/10 rounded-lg flex items-center justify-center">
          <Settings className="w-4 h-4 text-gray-400" />
        </div>
        <div>
          <h2 className="font-semibold text-white">Ajustes</h2>
          <p className="text-xs text-gray-500">Configura tus integraciones</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* DeepSeek API Key */}
        <Card>
          <div className="flex items-center gap-2 mb-3">
            <Key className="w-4 h-4 text-primary" />
            <h3 className="font-medium text-white">DeepSeek API</h3>
            {isApiKeyValid === true && (
              <Check className="w-4 h-4 text-success ml-auto" />
            )}
            {isApiKeyValid === false && (
              <X className="w-4 h-4 text-error ml-auto" />
            )}
          </div>

          <Input
            type="password"
            value={apiKeyInput}
            onChange={(e) => {
              setApiKeyInput(e.target.value);
              setIsApiKeyValid(null);
            }}
            placeholder="sk-..."
            helperText="Tu API key de DeepSeek para generar contenido"
          />

          <div className="flex gap-2 mt-3">
            <Button
              size="sm"
              onClick={handleValidateApiKey}
              isLoading={isValidating}
              className="flex-1"
            >
              Validar y Guardar
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open('https://platform.deepseek.com/api-keys', '_blank')}
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </Card>

        {/* Google Drive */}
        <Card>
          <div className="flex items-center gap-2 mb-3">
            <FolderOpen className="w-4 h-4 text-accent" />
            <h3 className="font-medium text-white">Google Drive</h3>
            {isGoogleConnected && (
              <span className="text-xs text-success ml-auto">Conectado</span>
            )}
          </div>

          <Input
            value={folderIdInput}
            onChange={(e) => setFolderIdInput(e.target.value)}
            placeholder="1hC1B2heWUyfBHQPPRnbcdeZ9tGzict1T"
            helperText="ID de tu carpeta 'Influencer' en Drive"
          />

          <div className="flex gap-2 mt-3">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleSaveFolderId}
              className="flex-1"
            >
              Guardar Folder ID
            </Button>
            <Button
              variant={isGoogleConnected ? 'ghost' : 'primary'}
              size="sm"
              onClick={handleConnectGoogle}
              className="flex-1"
            >
              {isGoogleConnected ? 'Reconectar' : 'Conectar Google'}
            </Button>
          </div>
        </Card>

        {/* Info */}
        <Card className="bg-primary/5 border-primary/20">
          <h3 className="font-medium text-primary mb-2">Sistema Nadal</h3>
          <p className="text-xs text-gray-400">
            Esta extension usa DeepSeek AI para generar guiones de reels
            basados en la metodologia del Sistema Nadal: hooks poderosos,
            estructura de 5 tomas, y CTAs emocionales.
          </p>
        </Card>

        {/* Keyboard shortcuts */}
        <Card>
          <h3 className="font-medium text-white mb-3">Atajos de teclado</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Enviar mensaje</span>
              <kbd className="px-2 py-0.5 bg-surface-hover rounded text-xs">Cmd + Enter</kbd>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Abrir extension</span>
              <kbd className="px-2 py-0.5 bg-surface-hover rounded text-xs">Cmd + Shift + I</kbd>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
